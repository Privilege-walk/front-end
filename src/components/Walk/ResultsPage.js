import React, { useEffect } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import QuestionGraph from "../Graphs/QuestionGraph";
import WalkGraph from "../Graphs/WalkGraph";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchAnswerStats, fetchEventStats } from '../../Store/actions';


function EventResults({fetchAnswerStats, fetchEventStats}){
    const [walkStats, setWalkStats] = React.useState([]);
    const [questionIndex, setQuestionsIndex] = React.useState(0);
    const [answerStats, setAnswerStats] = React.useState([]);
    const [isHost, setIsHost] = React.useState(false);
    const { eventId, uniqueCode } = useParams();

    // Set host/participant results page.
    useEffect(async () => {
        if(uniqueCode == "host"){
            setIsHost(true);
        }
    }, []);

    const handleChange = (event) => {
        setQuestionsIndex(event.target.value);
    };

    useEffect(async () => getAnswerStats(), []);

    async function getAnswerStats(){        
        const action = await fetchAnswerStats({eventId});
        if(action.payload.data){
            setAnswerStats(action.payload.data);

        }
    }

    useEffect(async () =>  fetchWalkStats(), []);

    async function fetchWalkStats(){
        const action = await fetchEventStats({
            eventId, 
            uniqueCode: uniqueCode=="host"? "" : uniqueCode
        });
        console.log(action);
        if(action.payload.data){
            setWalkStats(action.payload.data);
        }

    }

    function renderAnswerStats(){
        return (
            <Grid sx={{ pt:4}}>
                <Grid 
                        sx={{minHeight: '25px'}} 
                        container 
                        justifyContent='center' 
                        alignItems='center' 
                        direction='column' 
                        spacing={2}
                    >
                    <Typography variant="h5" component="div">Event Answer Statistics</Typography>
                </Grid>
                <Grid>

                
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Question</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={questionIndex}
                            label="Select Question"
                            onChange={handleChange}
                            >
                                {answerStats.map((item, index) => (
                                    <MenuItem key={item["question"]} value={index}>{item["question"]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <QuestionGraph data={answerStats[questionIndex]} />
            </Grid>
        );
    }

    return (
        <Container>
            {/* Privilege Walk graph */}
            <Grid sx={{ py:4}}>
                <Grid 
                    sx={{minHeight: '25px'}} 
                    container 
                    justifyContent='center' 
                    alignItems='center' 
                    direction='column' 
                    spacing={2}
                >
                    <Typography variant="h5" component="div">Perspective Walk</Typography>
                </Grid>
                <WalkGraph data={walkStats} />
            </Grid>

            {/* Answer stats graph */}
            {isHost && renderAnswerStats()}
        </Container>
    );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    fetchEventStats,
    fetchAnswerStats
};

var EventResultsContainer = connect(mapStateToProps, mapDispatchToProps)(EventResults);
export default EventResultsContainer;