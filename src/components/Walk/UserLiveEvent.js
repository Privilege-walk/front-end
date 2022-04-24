import React, { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWebSocketBaseUrl } from "../../api/functions";
import useWebSocket from 'react-use-websocket';

import { fetchQuestions, registerParticipant } from '../../Store/actions';
import Questions from './Questions';
import LandingPage from './LandingPage';
import ResultsPage from './ResultsPage';


const START_PAGE = 0;
const QUESTIONS_PAGE = 1;

function UserLiveEvent({fetchQuestions, registerParticipant}){
    
    const [pageIndex, setPageIndex] = useState(START_PAGE);
    const [eventName, setEventName] = useState("");
    const [questionsList, setQuestionsList] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(-1);
    const [activeUsers, setActiveUsers] = useState(0);
    const [answeredUsers, setAnsweredUsers] = useState(0);
    const [answers, setAnswers] = useState({});
    const [errMsg, setErrMsg] = useState("");
    const [participantCode, setParticipantCode] = useState("");    
    const { eventId } = useParams();
    const navigate = useNavigate();

    const socketUrl = getWebSocketBaseUrl() + "/ws/walk/qa_control/" + eventId + "/";
    const {
        sendJsonMessage
      } = useWebSocket(socketUrl, {
        onOpen: () => console.log('opened'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        onMessage: (event) => receiveMessageHandler(event),
    });

    useEffect(async () => fetchPartipantCode(), [])
    useEffect(async () => fetchAllQuestions(), []);
    useEffect(async () => changeAnswer(), [answers]);

    async function fetchPartipantCode(){

        const action = await registerParticipant({eventId});
        if (action.payload.errors || action.payload.status != "registered"){
            setErrMsg("Error! Unable to register for event. Please refresh your browser.")
        }else{
            let newParticipantCode = action.payload.participantCode;
            setParticipantCode(newParticipantCode);
        }  
    }
    
    async function changeAnswer() {
        if(questionsList.length > 0){
            const questionId = questionsList[questionIndex].id;
            const message = {
                "type": "answer_choice",
                "data": {
                    "participant_code": participantCode,
                    "questionId": questionId,
                    "answer_choice_id": answers[questionId] || ""
                }
            }
            sendJsonMessage(message);
        }   
    }

    function receiveMessageHandler(event){
        const inData = JSON.parse(event.data);
        // Do nothing if the message received is only for the host
        if(inData['meant_for'] === 'host') {
            return;
        }

        // Handling the active users count updating
        if(inData['type'] === 'active_user_count') {
            setActiveUsers(inData['data']['n_active_users']);
        }

        // Handling the question move
        if(inData['type'] === 'question_move'){       
            if( (questionIndex + 1) < questionsList.length){
                setQuestionIndex(questionIndex + 1);
                if (questionIndex == -1){
                    setPageIndex(QUESTIONS_PAGE);
                }
            }else{
                navigate(`/results/${eventId}/${participantCode}`);
            }           
        }

        // Handling the change in the number of user responses
        else if(inData['type'] === 'answer_count'){
            setAnsweredUsers(inData['data']['n_users_answered']);
        }
    }


    async function fetchAllQuestions() {
        const action = await fetchQuestions({ params: {event_id: eventId} });
        if (action.payload.error){
            setErrMsg("Unable to display the questions list!");
        }else{
            setQuestionsList(action.payload.questions);
            setEventName(action.payload.name);
        }
    }


    switch(pageIndex){
        case START_PAGE:
            return (
                <LandingPage 
                    eventName={eventName}
                    goNextPage={() => setPageIndex(QUESTIONS_PAGE)} 
                />
            );
        case QUESTIONS_PAGE:
            return (
                <Questions 
                    eventName={eventName}
                    questions={questionsList}
                    answers={answers}
                    setAnswers={setAnswers}
                    questionIndex={questionIndex}
                    userType="PARTICIPANT"
                    goNextPage={() => navigate(`/results/${eventId}/${participantCode}`) }
                />
            );
    }
    
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    fetchQuestions,
    registerParticipant
};

var UserLiveEventContainer = connect(mapStateToProps, mapDispatchToProps)(UserLiveEvent);
export default UserLiveEventContainer;