import { 
    CREATE_EVENT, 
    FETCH_EVENTS,
    REGISTER_PARTICIPANT 
} from "./actionTypes"

export const fetchEvents = () => ({
    type: FETCH_EVENTS,
    payload: { events: []}
})

export const createEvent = ({newEventName}) => ({
    type: CREATE_EVENT,
    payload: { newEventName }
})

export const registerParticipant = ({eventId}) => ({
    type: REGISTER_PARTICIPANT,
    payload: {eventId}
})