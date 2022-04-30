import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWebSocketBaseUrl } from "../../api/functions";
import useWebSocket from 'react-use-websocket';

import { fetchQuestions, registerParticipant } from '../../Store/actions';
import Questions from './Questions';
import LandingPage from './LandingPage';


const START_PAGE = 0;
const QUESTIONS_PAGE = 1;

// session storage keys
const ANSWER_KEY = "ANSWERS";
const PARTICIPANT_KEY = "PARTICIPANT_C0DE";
const EVENT_ID_KEY = "EVENT_ID";

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

    useEffect(async () => fetchAllQuestions(), []);
    useEffect(async () => fetchAnswers(), []);
    useEffect(async () => changeAnswer(), [answers]);
    useEffect(async () => fetchParticipantCode(), []);

    async function fetchAnswers(){
        const expectedAnswers = sessionStorage.getItem(ANSWER_KEY);    
        if (expectedAnswers){
            setAnswers(JSON.parse(expectedAnswers));
        }
    }

    async function fetchParticipantCode(){
        const savedEventId = sessionStorage.getItem(EVENT_ID_KEY);
        const savedParticipantCode = sessionStorage.getItem(PARTICIPANT_KEY);
        
        if(eventId == savedEventId && savedParticipantCode){
            setParticipantCode(savedParticipantCode);
        }else{
            const action = await registerParticipant({eventId});
            if (action.payload.errors || action.payload.status != "registered"){
                setErrMsg("Error! Unable to register for event. Please refresh your browser.")
            }else{
                let newParticipantCode = action.payload.participantCode;

                setParticipantCode(newParticipantCode);
                setAnswers({});

                // reset session with new data
                sessionStorage.clear();
                sessionStorage.setItem(PARTICIPANT_KEY, newParticipantCode);
                sessionStorage.setItem(EVENT_ID_KEY, eventId);
                sessionStorage.setItem(ANSWER_KEY, JSON.stringify({}));
            }  
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
            sessionStorage.setItem(ANSWER_KEY, JSON.stringify(answers));
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
            const expectedQuestionIndex = inData["data"]["question_index"];
            setQuestionIndex(expectedQuestionIndex);
            if (expectedQuestionIndex >= 0){
                setPageIndex(QUESTIONS_PAGE);
            }
        }

        // Handling the question move
        if(inData['type'] === 'question_move'){
            if(inData["data"]["endEvent"] || (questionIndex + 1) >= questionsList.length){
                navigate(`/results/${eventId}/${participantCode}`);
            }else{
                setQuestionIndex(questionIndex + 1);
                if (questionIndex == -1){
                    setPageIndex(QUESTIONS_PAGE);
                }
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