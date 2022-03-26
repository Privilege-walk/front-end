import React, { useState } from "react";
import { 
    Badge
 } from 'reactstrap';
 import Card from '@mui/material/Card';
 import CardContent from '@mui/material/CardContent';
 import Typography from '@mui/material/Typography';
 import Button from '@mui/material/Button';
 import CardActions from '@mui/material/CardActions';


export default function EventListItem({ name, status }) {
    return (
        <Card className="">
            <CardContent>
            <Typography>{name} <Badge color="primary">{status}</Badge></Typography>
            
            </CardContent>
            <CardActions>
                <Button variant="outlined" size="md">Edit</Button>
            </CardActions>
            
        </Card>
    );
}