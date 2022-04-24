import React, { useState } from 'react';
import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TableHead from '@mui/material/TableHead';
import FormHelperText from '@mui/material/FormHelperText';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';


import { createEvent } from '../../../Store/actions';


function EventForm({fetchAllEvents, createEvent}){
    const [eventName, setEventName] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [xLabelMin, setXLabelMin] = useState('');
    const [xLabelMax, setXLabelMax] = useState('');

    const handleSubmit = async (event) => {
        const action = await createEvent({ 
            newEventName: eventName,
            xLabelMin, xLabelMax
        });
        if (action.payload.status == "created"){
            fetchAllEvents();
            setEventName("");
            setErrMsg("");
            setXLabelMin("");
            setXLabelMax("");
        }else{
            setErrMsg("Unable to create the event!");
        }
    }
    
    return (<Paper 
        className="mb-3 align-items-center" 
        variant="outlined" 
        sx={{ p: '2px 4px',  display: 'flex',  flexGrow: 1, alignItems: 'center'}}
    >
        <FormControl error={errMsg.length > 0} fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="new-event-name">New Event Name</InputLabel>
            <OutlinedInput
                id="new-event-name"
                label="New Event Name" 
                variant="filled"
                autoComplete="off"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
            />
            <FormHelperText data-testid="event-error-text">{errMsg}</FormHelperText>
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="new-event-name">X Label Min</InputLabel>
            <OutlinedInput
                id="new-event-name"
                label="New Event Name" 
                variant="filled"
                autoComplete="off"
                value={xLabelMin}
                onChange={(e) => setXLabelMin(e.target.value)}
            />
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="new-event-name">X Label Max</InputLabel>
            <OutlinedInput
                id="new-event-name"
                label="New Event Name" 
                variant="filled"
                autoComplete="off"
                value={xLabelMax}
                onChange={(e) => setXLabelMax(e.target.value)}
            />
        </FormControl>
        <Box>
            <Button 
                variant="contained"
                type="submit"
                className="ml-2"
                onClick={handleSubmit}
            >
                Create Event
            </Button>  
        </Box>
    </Paper>);
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    createEvent
};

var EventFormContainer = connect(mapStateToProps, mapDispatchToProps)(EventForm);
export default EventFormContainer;