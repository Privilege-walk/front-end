import { 
    CREATE_EVENT, 
    FETCH_EVENTS, 
    FETCH_EVENT_STATS,
    REGISTER_PARTICIPANT 
} from "../actions/actionTypes";
import { restClient } from "../../api/restInterceptor";


const fetchAllEvents = async (payload) => {
    await restClient.get(`/host/events/all/`).then( res => {
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

const registerParticipant = async (payload) => {
    const errMessage = "Couldn't register user";
    try{
        await restClient.post(
            '/walk/register_participant/',
            {event_id: payload.eventId }
        ).then(async res => {
            if(res.data && res.data.status == "registered"){
                payload= {
                    ...payload,
                    status: res.data.status,
                    participantCode: res.data.participant_code 
                }
            } else {
                payload = { ...payload, errors: errMessage };
            }
        })
    }catch(error){
        console.log(error);
        payload = { ...payload, errors: errMessage };
    }
    return payload;
}

const fetchEventResultsMiddleware = async (payload) => {
    const errMessage = "Couldn't fetch event results";
    try{
        let url = `/host/event_stats/?event_id=${payload.eventId}`
        if (payload.unique_code){
            url += `&unique_code=${payload.uniqueCode}`
        }
        await restClient.get(
            url,
        ).then(async res => {
            payload = {
                ...payload,
                data: res.data
            }
        });
    }catch(error){
        console.log(error);
        payload = { ...payload, errors: errMessage };
    }
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
        case REGISTER_PARTICIPANT:
            action.payload = await registerParticipant(action.payload);
            break;
        case FETCH_EVENT_STATS:
            action.payload = await fetchEventResultsMiddleware(action.payload);
        default:
            break;
    }
    return next(action);
}

export {
    eventsMiddleware
}