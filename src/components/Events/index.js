import React from "react";
import { Row, Container} from 'reactstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TableHead from '@mui/material/TableHead';
import FormHelperText from '@mui/material/FormHelperText';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

import { connect } from 'react-redux';
import "../App.css";
import EventListItem from "./EventListItem";
import { fetchEvents, createEvent } from '../../Store/actions';


class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newEventName: "",
            eventsList: [],
            page: 0,
            rowsPerPage: 5,
            errMsg: ""
        }
    }

    changeNewEventName = (newEventName) => {
        this.setState({newEventName});
    }

    changeEventsList = (eventsList) => {
        this.setState({eventsList});
    }

    setErrMsg = (errMsg) => {
        this.setState({errMsg});
    }

    componentDidMount() {
        this.fetchAllEvents();
    }

    handleChangePage(event, newPage){
        this.setState({page: newPage});
    };
    
    fetchAllEvents = async () => {
        const action = await this.props.fetchEvents();
        if (action.payload.error){
            this.setErrMsg("Unable to display the events list!");
        }else{
            this.changeEventsList(action.payload.events);
        }
    }

    handleSubmit = async (event) => {
        const action = await this.props.createEvent({ newEventName: this.state.newEventName});
        if (action.payload.status == "created"){
            this.fetchAllEvents();
            this.setState({newEventName: ""});
        }else{
            this.setErrMsg("Unable to create the event!");
        }
    }

    render() {
        return (
            <Container id="eventsPageId" className="mx-2">
                <Row>
                <h1 className="event">Events</h1>
            
                <Paper 
                    className="mb-3 align-items-center" 
                    variant="outlined" 
                    sx={{ p: '2px 4px',  display: 'flex',  flexGrow: 1, alignItems: 'center'}}
                >
                    <FormControl error={this.state.errMsg.length > 0} fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="new-event-name">New Event Name</InputLabel>
                        <OutlinedInput
                            id="new-event-name"
                            label="New Event Name" 
                            variant="filled"
                            autoComplete="off"
                            value={this.state.newEventName}
                            onChange={(e) => this.changeNewEventName(e.target.value)}
                        />
                        <FormHelperText data-testid="event-error-text">{this.state.errMsg}</FormHelperText>
                    </FormControl>
                    <Box>
                        <Button 
                            variant="contained"
                            type="submit"
                            className="ml-2"
                            onClick={this.handleSubmit}
                        >
                            Create Event
                        </Button>  
                    </Box>
                </Paper>

                </Row>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <h4>All events</h4>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        this.state.eventsList.length === 0 ?
                        (<TableRow style={{color:'gray',marginLeft:10}}>
                            <TableCell><i>No events to show.</i></TableCell>
                        </TableRow>)
                        :
                        (
                            this.state.eventsList.slice(
                                this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
                            ).map( (item, _) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                    <EventListItem key={item.id} name={item.name} status={item.status} />
                                    </TableCell>
                                </TableRow>)
                        ))
                    }
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={this.state.eventsList.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={this.handleChangePage.bind(this)}
                    />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.authToken
    };
};

const mapDispatchToProps = {
    fetchEvents,
    createEvent
  };

var EventsContainer = connect(mapStateToProps, mapDispatchToProps)(Events);
export default EventsContainer;