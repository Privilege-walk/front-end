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

    return (
        <Card className="">
            <CardContent>
            <Typography>{name} <Badge color="primary">{status}</Badge></Typography>
            
            </CardContent>
            <CardActions>
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
            </CardActions>
            
        </Card>
    );
}