import { CREATE_EVENT, FETCH_EVENTS } from "../actions/actionTypes";
import { restClient } from "../../api/restInterceptor";


const fetchAllEvents = async (payload) => {
    await restClient.get(`/host/events/all/`).then( res => {
        console.log(res);
        if (res.data && res.data.hasOwnProperty('events')) {
            payload = {...payload, events: res.data.events.reverse()};
        } else {
            payload = { ...payload, errors: "Unable to load events"}
        }
    });
    return payload;
}


const createEvent = async (payload) => {
    await restClient.post(
        `/host/events/create/`, 
        { name: payload.newEventName }
    ).then(async res => {
        if (res.data && res.data.status === 'created') {
            payload = { ...payload, status: "created"}
        } else {
            payload = { ...payload, errors: "unabled to create event!"}
        }
    });
    return payload;
}


const eventsMiddleware = storeAPI => next => async action => {
    switch(action.type){
        case FETCH_EVENTS:
            action.payload = await fetchAllEvents(action.payload);
            break;
        case CREATE_EVENT:
            action.payload = await createEvent(action.payload);
            break;
        default:
            break;
    }
    return next(action);
}

export {
    eventsMiddleware
}