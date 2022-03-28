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
import QuestionsListItem from "./QuestionsListItem";
import OptionsListItem from "./OptionsListItem";
import { fetchQuestions, createQuestion } from '../../Store/actions';


function Questions({fetchQuestions, createQuestion}) {
    const props = useLocation();
    const [questionsList, setQuestionsList] = useState([]);
    const [optionsList, setOptionsList] = useState([]);
    const [newOptionId, setNewOptionId] = useState(0);
    const [newQuestion, setNewQuestion] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(async () => fetchAllQuestions(), []);

    async function fetchAllQuestions() {
        const action = await fetchQuestions({ params: {event_id: props.state.id} });
        if (action.payload.error){
            setErrMsg("Unable to display the questions list!");
        }else{
            setQuestionsList(action.payload.questions);
        }
    }
    
    function createChoices() {
        let options = JSON.parse(JSON.stringify(optionsList));
        return options.map( item => {
            return { "description": item.description, "value": item.value };
        });
    }

    async function submitNewQuestion(event) {
        let requestBody = {
            "event_id": props.state.id,
            "title": newQuestion,
            "choices": createChoices()
        }
        const action = await createQuestion({ requestBody });
        if (action.payload.status == "created"){
            fetchAllQuestions();
            setNewQuestion(action.payload.newQuestion);
            setOptionsList(action.payload.optionsList);
            setNewOptionId(action.payload.newOptionId);
        }else{
            setErrMsg("Unable to create the question!");
        }
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
                                disabled={(newQuestion === "" || newQuestion.trim() === "") || optionsList.length < 2}
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

const mapDispatchToProps = {
    fetchQuestions,
    createQuestion
};

var QuestionsContainer = connect(mapStateToProps, mapDispatchToProps)(Questions);
export default QuestionsContainer;