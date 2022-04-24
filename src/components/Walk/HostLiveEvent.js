import React, { useState, useEffect } from "react";
import ResultsPage from './ResultsPage';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWebSocketBaseUrl } from "../../api/functions";
import useWebSocket from 'react-use-websocket';
import { fetchQuestions } from '../../Store/actions';
import QRCodePage from './QRCodePage';
import Questions from './Questions';



const QRCODE_PAGE = 0;
const QUESTIONS_PAGE = 1;

function HostLiveEvent({fetchQuestions}){
    const [pageIndex, setPageIndex] = useState(QRCODE_PAGE);
    const [eventName, setEventName] = useState("");
    const [questionsList, setQuestionsList] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(-1);
    const [activeUsers, setActiveUsers] = useState(0);
    const [answeredUsers, setAnsweredUsers] = useState(0);
    const [errMsg, setErrMsg] = useState("");
    const { eventId } = useParams();
    const [currentPositions, setCurrentPositions] = useState({});
    const [questionsStats, setQuestionsStats] = useState([]);
    const [x_label_min, set_x_label_min] = useState("");
    const [x_label_max, set_x_label_max] = useState("");
    const navigate = useNavigate();

    useEffect(async () => fetchAllQuestions(), []);

    async function fetchAllQuestions() {
        const action = await fetchQuestions({ params: {event_id: eventId} });
        if (action.payload.error){
            setErrMsg("Unable to display the questions list!");
        }else{
            setQuestionsList(action.payload.questions);
            createQuestionsStats(action.payload.questions);
            setEventName(action.payload.name);
            set_x_label_min(action.payload['x_label_min']);
            set_x_label_max(action.payload['x_label_max']);
        }
    }

    function createQuestionsStats(questions) {
        let stats = [];
        for (let q of questions) {
            let answers = [];
            for (let c of q['choices']) {
                answers.push({
                    "answer_id": c.id,
                    "answer": c.description,
                    "count": 0
                });
            }
            stats.push({
                "question_id": q.id,
                "answers": answers
            })
        }
        setQuestionsStats(stats);
    }

    const socketUrl = getWebSocketBaseUrl() + "/ws/walk/qa_control/" + eventId + "/";
    
    const {
        sendJsonMessage
      } = useWebSocket(socketUrl, {
        onOpen: () => console.log('opened'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        onMessage: (event) => receiveMessageHandler(event),
    });

    function receiveMessageHandler(event){
        const inData = JSON.parse(event.data);
        // Do nothing if the message received is only for the participants
        if(inData['meant_for'] === 'participant') {
            return;
        }

        // Handling the active users count updating
        if(inData['type'] === 'active_user_count') {
            // setActiveUsers(inData['data']['n_active_users'] - 1);
            setActiveUsers(inData['data']['n_active_users']);
        }

        // Handling the change in the number of user responses
        else if(inData['type'] === 'answer_count'){
            let inc_ans_id = inData['data']['increment_answer_id'];
            let stats = JSON.parse(JSON.stringify(questionsStats));
            for (let i of stats[questionIndex]['answers']) {
                if (i['answer_id'] === inc_ans_id) {
                    i['count'] = i['count'] + 1;
                    break;
                }
            }
            setQuestionsStats(stats);
            setAnsweredUsers(Math.min(inData['data']['n_users_answered'], activeUsers - 1));
        }

        else if(inData['type'] === 'line_counts') {
            let temp_dat = {
                "meant_for": "host",
                "type": "line_counts",
                "data": {
                    "position_stats": {
                        "-2": 2,
                        "-1": 4
                    }
                }
            }
            let positions = {
                "barDefaultColor": "#8884d8",
                "xLabelMin": x_label_min,
                "xLabelMax": x_label_max,
                "data": []
            }
            for(let [key, value] of Object.entries(temp_dat['data']['position_stats'])) {
                positions.data.push({
                    "barName":"",
                    "count": value,
                    "participantLocation": false
                });
            }
            setCurrentPositions(positions);
        }
    }

    function nextQuestion(index=null){
        if (questionIndex < questionsList.length){
            index = index? index != null : questionIndex + 1;
            const message = {
                "type": "question_move",
                "data": {
                    "questionIndex": index,
                }
            };
            sendJsonMessage(message);
            
            if (index == questionsList.length){
                navigate(`/results/${eventId}/host`);
            }else{
                setQuestionIndex(index);
                setAnsweredUsers(0);
            }
        }
    }

    function QRCodePageNext(){
        setPageIndex(QUESTIONS_PAGE);
        nextQuestion(0);
    }

    switch(pageIndex){
        case QRCODE_PAGE:
            return (
                <QRCodePage 
                    eventName={eventName}
                    eventId={eventId}
                    goNextPage={() => QRCodePageNext() }
                />
            );
        case QUESTIONS_PAGE:
            return (
                <Questions 
                    userType="HOST"
                    eventName={eventName}
                    questions={questionsList}
                    activeUsers={activeUsers}
                    answeredUsers={answeredUsers}
                    questionIndex={questionIndex}
                    goNextPage={() => {} }
                    nextQuestion={() => nextQuestion()}
                    currentPositions={currentPositions}
                    questionsStats={questionsStats}
                />
            );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    fetchQuestions
};

var HostLiveEventContainer = connect(mapStateToProps, mapDispatchToProps)(HostLiveEvent);
export default HostLiveEventContainer;