import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';


export default class Questions extends React.Component{
    
    constructor(props){
        super(props);
    }
    
    handleSelectChoice(choiceId, selected){
        let answer = selected? "" : choiceId;
        const props = this.props;
        let answers = { ...props.answers };
        let questionId = props.questions[props.questionIndex].id;
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
        let questionDetails = this.props.questions[this.props.questionIndex];
        if(questionDetails){
            question = questionDetails.description;
            choices = questionDetails.choices;
        }
        return (
            <Grid container lg={10} sx={{ minHeight: '225px'}} item direction='column'>
                {/* Question */}
                <Grid item>
                    <Typography id={"question"}  variant="h6" component="div">
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
                        choice.id == this.props.answers[questionDetails.id]?
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

    renderHostBody(){
        let question = ""; 
        let questionDetails = this.props.questions[this.props.questionIndex];
        if(questionDetails){
            question = questionDetails.description;
        }
        return (
            <Grid container lg={10} sx={{ minHeight: '225px'}} item direction='column'>
                {/* Question */}
                <Grid item>
                    <Typography id={"question"}  variant="h6" component="div">
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
                        {this.props.questionIndex + 1}/{this.props.questions.length} Questions
                    </Typography>
                    
                </Grid>

                {this.props.userType == "HOST"?
                    (
                        <Button 
                            variant={this.props.activeUsers == this.props.answeredUsers? "contained" : "outlined"}
                            type="submit"
                            sx={{mt:2}}
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
                            disabled={!this.props.answers[questionIndex]}        
                        >
                            
                            Waiting for host ...
                        </Button>
                    )
                        }  
            </Grid>
        );
    }

    render(){
        switch(this.props.userType){
            case 'HOST':
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
                        ></Grid>
                        {this.renderHeader()}
                        {this.renderHostBody()}
                        {this.renderFooter()}
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