import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useLocation } from "react-router-dom";
import {Row, Container} from 'reactstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TableHead from '@mui/material/TableHead';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import {restClient } from "../../api/restInterceptor";
import QuestionsListItem from "./QuestionsListItem";
import OptionsListItem from "./OptionsListItem";


function Questions() {
    const props = useLocation();
    const [questionsList, setQuestionsList] = useState([]);
    const [optionsList, setOptionsList] = useState([]);
    const [newOptionId, setNewOptionId] = useState(0);
    const [newQuestion, setNewQuestion] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(async () => fetchAllQuestions(), []);

    async function fetchAllQuestions() {
        await restClient.get(`/host/qa/eventwise_qas/`, { params: {event_id: props.state.id} })
        .then(async res => {
            console.log(res);
            if (res.data && res.data.hasOwnProperty('questions')) {
                setQuestionsList(res.data.questions);
            } else {
                this.setErrMsg("Unable to display the events list!");
            }
        });
    }
    
    function createChoices() {
        let options = JSON.parse(JSON.stringify(optionsList));
        return options.map( item => {
            return { "description": item.description, "value": item.value };
        });
    }

    async function submitNewQuestion(event) {
        console.log(event)
        let requestBody = {
            "event_id": props.state.id,
            "title": newQuestion,
            "choices": createChoices()
        }
        await restClient.post(
            `/host/qa/create/`, 
            requestBody
        ).then(async res => {
            if (res.data && res.data.status === 'created') {
                fetchAllQuestions();
                setNewQuestion("");
                setOptionsList([]);
                setNewOptionId(0);
            } else {
                setErrMsg("Unable to create the event!");
            }
        });
    }

    function handleOptionAdd(option) {
        let options = JSON.parse(JSON.stringify(optionsList));
        options.push(option);
        setOptionsList(options);
        setNewOptionId(newOptionId + 1);
    }

    function handleOptionEdit(option) {
        let options = JSON.parse(JSON.stringify(optionsList));
        options.forEach( (item, index) => {
            if(item.id === option.id) {
                options[index] = option;
            }
        });
        setOptionsList(options);
    }

    function handleOptionDelete(id) {
        let options = JSON.parse(JSON.stringify(optionsList));
        options = options.filter(x => x.id != id);
        setOptionsList(options);
    }

    return (
        <Container className="mx-2">
            <Row>
                <h1 className="event">{props.state.name}</h1>
                <Paper 
                    className="mb-3 align-items-center" 
                    variant="outlined" 
                    elevation={0} 
                    sx={{ p: '2px 4px', display: 'flex', flexGrow: 1, alignItems: 'center', flexDirection: 'column'}}
                >
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="new-question-name">Add New Question</InputLabel>
                        <OutlinedInput
                            id="new-question-name"
                            label="Add New Question"
                            variant="filled"
                            autoComplete="off"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                        />
                    </FormControl>
                    <div style={{width: '100%'}}>
                        {
                            optionsList.map( (item) => (
                                <OptionsListItem 
                                    key={item.id}
                                    id = {item.id}
                                    type = 'edit'
                                    description = {item.description}
                                    value = {item.value}
                                    editOption = {handleOptionEdit}
                                    deleteOption = {handleOptionDelete}
                                    optionDisabled = {true}
                                />
                            ))
                        }
                        <OptionsListItem 
                            id = {newOptionId}
                            type = 'new'
                            description = ''
                            value = ''
                            addOption = {handleOptionAdd}
                            optionDisabled = {false}
                        />
                        <Box sx={{p: '20px 0px 8px 8px'}}>
                            <Button 
                                variant="contained"
                                type="submit"
                                className="ml-2"
                                onClick={submitNewQuestion}
                                disabled={newQuestion === "" || newQuestion.trim() === ""}
                            >
                                Create Question
                            </Button>  
                        </Box>
                    </div>
                </Paper>
            </Row>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <h4>Questions</h4>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        questionsList.length === 0 ?
                        (<TableRow style={{color:'gray',marginLeft:10}}>
                            <TableCell><i>No questions to show.</i></TableCell>
                        </TableRow>)
                        :
                        (
                            questionsList.map( (item, _) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <QuestionsListItem 
                                            key={item.id}
                                            description={item.description}
                                            choices={item.choices}
                                        />
                                    </TableCell>
                                </TableRow>)
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        token: state.authToken
    };
};

var QuestionsContainer = connect(mapStateToProps)(Questions);
export default QuestionsContainer;