import React, { useState } from "react";
 import Card from '@mui/material/Card';
 import CardContent from '@mui/material/CardContent';
 import Typography from '@mui/material/Typography';
 import OptionsListItem from "../OptionsListItem";


export default function QuestionsListItem({ description, choices }) {
    const [answerChoices, changeChoices] = useState([...choices].reverse())
    return (
        <Card className="">
            <CardContent>
            <Typography>{description}</Typography>
            </CardContent>
            {
                answerChoices.map( (item) => (
                    <OptionsListItem 
                        key={item.id}
                        type = 'view'
                        description = {item.description}
                        value = {item.value}
                        optionDisabled = {true}
                    />
                ))
            }
        </Card>
    );
}