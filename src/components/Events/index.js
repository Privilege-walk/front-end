import React from "react";
import Form from "react-bootstrap/Form";
import {Label, Button, FormGroup, Input, Row, Col, Container} from 'reactstrap';
import { connect } from 'react-redux';
import "../App.css";
import {restClient } from "../../api/restInterceptor";
import EventListItem from "./EventListItem";


class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newEventName: "",
            eventsList: [],
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
    
    fetchAllEvents = () => {
        restClient.get(`/host/events/all/`).then(async res => {
            console.log(res);
            if (res.data && res.data.hasOwnProperty('events')) {
                this.changeEventsList(res.data.events);
            } else {
                this.setErrMsg("Unable to display the events list!");
            }
        });
    }

    handleSubmit = async (event) => {
        console.log(event)
        await restClient.post(
            `/host/events/create/`, 
            { name: this.state.newEventName }
        ).then(async res => {
            if (res.data && res.data.status === 'created') {
                this.fetchAllEvents();
            } else {
                this.setErrMsg("Unable to create the event!");
            }
        });
    }

    render() {
        return (
            <Container className="mx-2">
                <Row>
                <h1 className="event">Events</h1>
                </Row>

                <Row>
                <Form onSubmit={this.handleSubmit} className="createEventForm">
                    <FormGroup size="lg" id="neweventname">
                        <Label htmlFor="new-event-name">New Event Name</Label>
                        <Input
                            id="new-event-name"
                            type="text"
                            value={this.state.newEventName}
                            onChange={(e) => this.changeNewEventName(e.target.value)}
                        />
                    </FormGroup>
                    <Button 
                        size="lg"
                        type="submit"
                        onClick={this.handleSubmit}
                    >
                        Create Event
                    </Button>
                    
                </Form>
                </Row>
                <Row>
                {
                    this.state.eventsList.length === 0 ?
                    (<div style={{color:'gray',marginLeft:10}}><i>No events to show.</i></div>)
                    :
                    (this.state.eventsList.map( (item, _) => <EventListItem key={item.id} name={item.name} status={item.status} />))
                }
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.authToken
    };
};

var EventsContainer = connect(mapStateToProps)(Events);
export default EventsContainer;