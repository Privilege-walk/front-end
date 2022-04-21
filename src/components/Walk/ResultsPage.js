import React from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import QuestionGraph from "../Graphs/QuestionGraph";
import WalkGraph from "../Graphs/WalkGraph";

/**
 * GRAPH 1: Questions Data format
 */
const questionAnswers = [
    // Dictionary of questions in the order in which the questions were asked.
    {
        question: "Question 1?",
        answers: [
            {
                "answer": "YES", // answer option
                "count": 2  // Number of users who chose this answer for this question. 
            },
            {
                "answer": "NO",
                "count": 3
            }
        ],  
    },
    {
        question: "Question 2?",
        answers: [
            {
                "answer": "High Scool's",
                "count": 10
            },
            {
                "answer": "Bachelor's",
                "count": 4
            },
            {
                "answer": "Masters",
                "count": 3
            }
        ],      
    }
]




/*
GRAPH 2: 
Expected API data format for both host and Participant results page.
{
    barDefaultColor: str,  // (required)    - default color of the bar graphs
    data: [ // data is a sorted array. The left most item in the array will contain data for the left most bar chart 
        {
            barName: str,  (required) - This will be displayed at the bottom of a bar. Can be an empty string.
            count: number,  (required)  - The height of the bar graph.
            participantLocation: boolean (required) - This shows the location of the participant. If sending data to host this will always be false
        },
        {
            ....
        }
    ]
}
See example below
*/
const results = {
    barDefaultColor: '#8884d8',
    data: [
        {
        barName: '',
        count: 2,
        participantLocation: false
        },
        {
        barName: '',
        count: 10,
        participantLocation: true // If sending data to participants, this will indicate location of participant.
        },
        {
        barName: '',
        count: 1,
        participantLocation: false
        },
        {
        barName: '',
        count: 6,
        participantLocation: false
        },
        {
        barName: '',
        count: 4,
        participantLocation: false
        },
        {
        barName: '',
        count: 2,
        participantLocation: false
        },
        {
        barName: '',
        count: 1,
        participantLocation: false
        },
    ]
};



export default function ResultsPage(){
    return (
        <Container>
            <Grid>
                <WalkGraph data={results} />
            </Grid>

            <Grid>
                <QuestionGraph data={questionAnswers[0]} />
            </Grid>
        </Container>
    );
}