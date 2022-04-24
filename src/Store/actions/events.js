import { 
    CREATE_EVENT, 
    FETCH_EVENTS,
    REGISTER_PARTICIPANT,
    FETCH_EVENT_STATS 
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

export const fetchEventStats = ({ eventId, uniqueCode }) => ({
    type: FETCH_EVENT_STATS,
    payload: {
        eventId, uniqueCode
    }
});