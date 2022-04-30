import React, { useState } from "react";
import { 
    Badge
 } from 'reactstrap';
 import { useNavigate } from "react-router-dom";
 import Card from '@mui/material/Card';
 import CardContent from '@mui/material/CardContent';
 import Typography from '@mui/material/Typography';
 import Button from '@mui/material/Button';
 import CardActions from '@mui/material/CardActions';


export default function EventListItem({ id, name, status }) {
    const navigate = useNavigate();

    function redirectToQuestions() {
        navigate('/questions', { state: {id, name, status} });
    }

    function redirectToLiveEvent(){
        navigate('/host/walk/' + id);
    }

    function redirectToEventResultsPage(){
        navigate(`/results/${id}/host`);
    }

    function renderNewEventActions(){
        return(
            <React.Fragment>
            <Button 
                id={'edit-'+id}
                variant="outlined" 
                size="md"
                onClick={redirectToQuestions}
            >
                Edit
            </Button>

            <Button
                id={'go-live-'+id}
                sx={{ml:3}} 
                variant="outlined" 
                size="md"
                onClick={redirectToLiveEvent}
            >
                Go Live
            </Button>
        </React.Fragment>);
    }

    function renderEndEventActions(){
        return (<React.Fragment>
                <Button 
                    id={'edit-' + id}
                    variant="outlined" 
                    size="md"
                    onClick={redirectToEventResultsPage}
                >
                    Results
                </Button>
        </React.Fragment>);
    }

    let cardActionsFunc = renderEndEventActions;
    let badgeColor = "success";
    if(status == "created"){
        badgeColor = "primary";
        cardActionsFunc = renderNewEventActions;
    }
    return (
        <Card className="">
            <CardContent>
            <Typography>{name} <Badge color={badgeColor}>{status}</Badge></Typography>
            
            
            </CardContent>
            <CardActions>
                {cardActionsFunc()}
            </CardActions>
            
            
        </Card>
    );
}