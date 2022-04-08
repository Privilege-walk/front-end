import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { eventQuestions } from "../../api/mockData/questions";
import { event } from "../../api/mockData/event";
import { getWebSocketBaseUrl } from "../../api/functions";
import Cookies from 'js-cookie';


export default class UserQuestions extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            questions: [],
            questionIndex: -1,
            answers: {},
            nextButtonText: "next"
        };
    }

    componentDidMount(){
        // User would land on this page once they scan a QR code.
        // Then we would use websockets to connect and get event details
        this.setState({
            questionIndex: 0,
            answers: {},
            questions: eventQuestions,
            eventName: event.name,
            eventDescription: event.description
        });

        // Websockets 
    }

    receiveHandler(inData){
        // Do nothing if the message received is only for the participants
        // Do nothing if the message received is only for the participants
        if(inData['meant_for'] === 'host')
        {
            return;
        }

        // Handling the active users count updating
        if(inData['type'] === 'active_user_count')
        {
            this.setActiveUsers(inData['data']['n_active_users']);
        }

        // Handling the question move
        if(inData['type'] === 'question_move')
        {
            this.nextQuestion();
        }

        // Handling the change in the number of user responses
        else if(inData['type'] === 'answer_count')
        {
            this.setAnsweredUsers(inData['data']['n_users_answered']);
        }
    }

    nextQuestion(){
        // TODO
    }

    setAnsweredUsers(){
        // TODO
    }

    setActiveUsers(){
        // TODO
    }

    initializeWebsocket(eventId){
        const url = getWebSocketBaseUrl() + "/ws/walk/qa_control/" + eventId + "/";
        this.websocket = new WebSocket(url);
        this.websocket.onmessage = (event) => {
            const inData = JSON.parse(event.data);
            this.receiveHandler(inData);
        }

    }

    handleNext(event){
        event.preventDefault();
        if((this.state.questionIndex + 1) == this.state.questions.length){
            this.props.goNextPage();
        }else{
            this.setState((prevState) => ({
                questionIndex: prevState.questionIndex + 1
                })
            );
        }
        
    }
    
    renderHeader(){
        return (
            <Grid container lg={1} item direction='column'>
                {/* Title */}
                <Grid item>
                    <Typography id="eventName"  variant="h5" component="div">
                        Event: {this.state.eventName}
                    </Typography>
                </Grid>

            {/* Graph */}
            {/* <Grid sx={{border: '2px solid'}} item>
                <Typography  variant="h5" component="div">
                </Typography>
            </Grid> */}
        </Grid>
        );
    }

    handleSelectChoice(choiceId, selected){
        let answer = choiceId;
        let nextButtonText = "Waiting for host ...";
        if(selected){
            answer = "";
            nextButtonText = "next";
        }
        this.setState(prevState => {
            let answers = { ...prevState.answers };
            let questionId = prevState.questions[prevState.questionIndex].id;
            answers[questionId] = answer;
            return ({
                answers,
                nextButtonText
            })
        });

        // Q: Where do we get the cookie in the first place?
        // When users join an event how does the backend know without the user sending their first answer?
        var participant_code = "DOOT"; // Replace this with the participant code stored in the cookies
        // Cookies.get('participant_code')

        walkSocket.send(
            JSON.stringify(
                {
                    "type": "answer_choice",
                    "data": {
                        "participant_code": participant_code,
                        "answer_choice_id": answer_id
                    }
                }
            )
        );
    }

    renderBody(){
        let question = ""; 
        let choices = [];
        let questionDetails = this.state.questions[this.state.questionIndex];
        if(questionDetails){
            question = questionDetails.description;
            choices = questionDetails.choices;
        }
        return (
            <Grid container lg={10} sx={{ minHeight: '225px'}} item direction='column'>
                {/* Question */}
                <Grid item>
                    <Typography id="question"  variant="h6" component="div">
                        {this.state.questions[this.state.questionIndex]? 
                            this.state.questions[this.state.questionIndex].description : 
                            ""
                        }
                    </Typography>
                </Grid>

                {/* Choices */}
                <Grid 
                    sx={{mb: 1}} 
                    id="choices"
                    container item 
                    alignItems="flex-start" 
                    direction="column" 
                >
                    {choices.map((choice, _) => (
                        choice.id == this.state.answers[questionDetails.id]?
                            (
                                <Button
                                    variant="outlined" 
                                    onClick={() => this.handleSelectChoice(choice.id, true)}
                                    sx={{mx:1, mt:1}} 
                                    className="choice"
                                    style={{ border: '3px solid' }}
                                    key={choice.id}
                                >
                                    {choice.description}
                                </Button>
                            ):
                            (
                                <Button 
                                    variant="outlined" 
                                    className="choice"
                                    onClick={() => this.handleSelectChoice(choice.id, false)}
                                    sx={{mx:1, mt:1}} 
                                    key={choice.id}
                                >
                                    {choice.description}
                                </Button>
                            )
                        )
                    )}
                </Grid>
            </Grid>
        );
    }

    renderFooter(){
        const question = this.state.questions[this.state.questionIndex];
        const questionIndex = question? question.id: "";
        return (
            <Grid container lg={1} sx={{minHeight: '50px'}} item direction='column'>
                {/* Number of people who have answered so far */}
                {/* <Grid item>
                    <Typography  variant="h6" component="div"> 
                    </Typography>
                </Grid> */}

                <Grid container direction="column" item >

                    <Typography id="numQuestions"  variant="p" component="div">
                        {this.state.questionIndex + 1}/{this.state.questions.length} Questions
                    </Typography>
                    
                </Grid>

                <Button 
                    variant="contained"
                    type="submit"
                    sx={{mt:2}}
                    onClick={this.handleNext.bind(this)}
                    disabled={!this.state.answers[questionIndex]}
                >
                    Waiting for host ...
                </Button>  
            </Grid>
        );
    }

    render(){
        return (        
            <Container 
                sx={{px:6, mt:3}}
            >
                <Grid 
                    sx={{minHeight: '40px'}} 
                    container 
                    justifyContent='center' 
                    alignItems='center' 
                    direction='column' 
                    spacing={2}
                >
                    {/* Header */}
                    {this.renderHeader()}

                    {/* Body */}
                    {this.renderBody()}

                    {/* Footer */}
                    {this.renderFooter()}
                    
                </Grid>
            </Container>
        );
    }
}