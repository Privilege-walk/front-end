import { CREATE_EVENT, FETCH_EVENTS } from "./actionTypes"

export const fetchEvents = () => ({
    type: FETCH_EVENTS,
    payload: { events: []}
})

export const createEvent = ({newEventName}) => ({
    type: CREATE_EVENT,
    payload: { newEventName }
})