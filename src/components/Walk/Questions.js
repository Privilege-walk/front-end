import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';

import CardContent from '@mui/material/CardContent';
import Timer from './Timer';
import QuestionGraph from "../Graphs/QuestionGraph";
import WalkGraph from "../Graphs/WalkGraph";


export default class Questions extends React.Component{
    
    constructor(props){
        super(props);
        const selectedValue = this.getSelectedValue();
        this.state = {
            selectedValue,
            disalbleSubmit: selectedValue != ""
        };
    }

    getSelectedValue(){
        let questionDetails = this.props.questions[this.props.questionIndex];
        let selectedValue = "";
        if(questionDetails && this.props.answers){
            selectedValue = this.props.answers[questionDetails.id] || "";
        }
        return selectedValue;
    }

    componentDidUpdate(prevProps) {
        if (this.props.questionIndex !== prevProps.questionIndex) {
            let questionDetails = this.props.questions[this.props.questionIndex];
            this.setState({
                disalbleSubmit: false,
                selectedValue: questionDetails ? questionDetails.choices[0].id : ""
            });
        }

        if(this.props.answers !== prevProps.answers || this.props.questions !== prevProps.questions){
            const selectedValue = this.getSelectedValue();
            this.setState({
                selectedValue,
                disalbleSubmit: selectedValue != ""
            });
        }
    }
    
    handleSelectChoice(choiceId){
        this.setState({disalbleSubmit: true});
        let answer = choiceId;
        const props = this.props;
        let answers = { ...props.answers };
        const questionId = props.questions[props.questionIndex].id;
        answers[questionId] = answer;
        props.setAnswers(answers);
    }

    renderHeader(){
        return (
            <Grid container lg={1} item direction='column'>
                {/* Title */}
                <Grid item>
                    <Typography id="eventName"  variant="h5" component="div">
                        Event: {this.props.eventName}
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

    renderBody(){
        let question = ""; 
        let choices = [];
        let questionId = "";
        let questionDetails = this.props.questions[this.props.questionIndex];  
        if(questionDetails){
            question = questionDetails.description;
            choices = questionDetails.choices;
            questionId = questionDetails.id;
        }
        return (
            <Grid container lg={10} sx={{ minHeight: '225px'}} item direction='column'>
                {/* Question */}
                <Grid item>
                    <Typography id={"question"} data-testid={"question"} variant="h6" component="div">
                        {questionDetails? 
                            questionDetails.description : 
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
                        <Box key={choice.id}>
                            <Radio
                                checked={choice.id === this.state.selectedValue}
                                onClick={() => this.setState({selectedValue: choice.id})}
                                value={choice.id}
                                name={"radio-buttons-"+choice.id}
                                inputProps={{ 'aria-label': 'A' }}
                                disabled={this.state.disalbleSubmit}
                                data-testid={"choice"+choice.id}
                            />
                            <FormLabel 
                                id={"radio-label-"+choice.id}
                                data-testid={"radio-label-"+choice.id}
                                onClick={() => this.setState({selectedValue: choice.id})}
                            >
                                {choice.description}
                            </FormLabel>
                        </Box>
                        )
                    )}
                    <Button
                        variant="outlined"
                        sx={{mx:1, mt:1}}
                        className="choice"
                        disabled={this.state.disalbleSubmit}
                        onClick={() => this.handleSelectChoice(this.state.selectedValue)}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        );
    }

    renderHostBody(){
        let question = ""; 
        let questionDetails = this.props.questions[this.props.questionIndex];
        if(questionDetails){
            question = questionDetails.description;
        }
        return (
            <Grid container lg={1} sx={{ minHeight: '225px'}} item direction='column'>
                {/* Question */}
                <Grid item>
                    <Typography id={"question"} data-testid={"question"} variant="h6" component="div">
                        {questionDetails? 
                            questionDetails.description : 
                            ""
                        }
                    </Typography>
                </Grid>
                <Grid container item>
                    <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Total Participants
                        </Typography>
                        <Typography variant="h5" component="div">
                            {this.props.activeUsers}
                        </Typography>       
                    </CardContent>  
                    </Card>

                    <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Total Answered
                        </Typography>
                        <Typography variant="h5" component="div">
                            {this.props.answeredUsers}
                        </Typography>       
                    </CardContent> 
                    </Card> 
                </Grid>
            </Grid>);
    }

    renderFooter(){
        
        const question = this.props.questions[this.props.questionIndex];
        const questionId = question? question.id: "";
        return (
            <Grid container sx={{minHeight: '50px'}} item direction='column'>
                {/* Number of people who have answered so far */}
                {/* <Grid item>
                    <Typography  variant="h6" component="div"> 
                    </Typography>
                </Grid> */}

                <Grid container direction="column" item >

                    <Typography id="numQuestions"  variant="p" component="div">
                        {this.props.questionIndex + 1}/{this.props.questions.length} Questions
                    </Typography>
                    
                </Grid>

                {this.props.userType == "HOST"?
                    (
                        <Button 
                            variant={this.props.activeUsers == this.props.answeredUsers? "contained" : "outlined"}
                            type="submit"
                            sx={{mt:2, width: '30%'}}
                            onClick={()=> this.props.nextQuestion()}                         
                        >
                            Next Question
                        </Button>
                    ) :
                    (
                        <Button 
                            variant="outlined"
                            type="submit"
                            sx={{mt:2}}
                            onClick={()=> {}}     
                            disabled={!this.props.answers[questionId]}        
                        >
                            
                            Waiting for host ...
                        </Button>
                    )
                }
                {
                    this.props.userType == "HOST" &&
                    <Timer questionIndex={this.props.questionIndex} />
                }
            </Grid>
        );
    }
    renderHostGraphs() {
        return (
            <Grid container item direction='column'>
                <Grid container direction="column" item >
                    <Typography id="question_graph"  variant="p" component="div">
                        {
                            this.props.questions[this.props.questionIndex] !== undefined &&
                            this.props.questions[this.props.questionIndex]['description']
                        }
                    </Typography>
                    <QuestionGraph data={this.props.questionsStats[this.props.questionIndex]} />
                </Grid>
                {
                    this.props.currentPositions &&
                    this.props.currentPositions.hasOwnProperty('data') &&
                    this.props.currentPositions['data'].length !== 0 &&
                    <Grid container direction="column" item >
                        <Typography id="question_graph"  variant="p" component="div">
                            Current Positions
                        </Typography>
                        <WalkGraph data={this.props.currentPositions} />
                    </Grid>
                }
            </Grid>
        );
    }

    render(){
        switch(this.props.userType){
            case 'HOST':
                return (
                    <Container 
                        sx={{px:6, mt:3, display: 'flex', flexDirection: 'row'}}
                    >
                        <Grid 
                            sx={{minHeight: '40px'}} 
                            container 
                            // justifyContent='center' 
                            alignItems='center' 
                            direction='column' 
                            spacing={2}
                        >
                            {this.renderHeader()}
                            {this.renderHostBody()}
                            {this.renderFooter()}
                        </Grid>
                        {this.renderHostGraphs()}
                    </Container>
                )
        }
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