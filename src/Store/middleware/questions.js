import { CREATE_QUESTION, FETCH_QUESTIONS, FETCH_ANSWERS_STATS } from "../actions/actionTypes";
import { restClient } from "../../api/restInterceptor";


const fetchAllQuestions = async (payload) => {
    await restClient.get(`/host/qa/eventwise_qas/`, { params: payload.params })
    .then(async res => {
        if (res.data && res.data.hasOwnProperty('questions')) {
            payload = {
                ...payload, 
                id:res.data.id, 
                name: res.data.name,
                status: res.data.status, 
                questions: res.data.questions
            };
        } else {
            payload = { ...payload, errors: "Unable to load questions"}
        }
    });
    return payload;
}


const createQuestion = async (payload) => {
    await restClient.post(
        `/host/qa/create/`, 
        payload.requestBody
    ).then(async res => {
        if (res.data && res.data.status === 'created') {
            payload = { ...payload, status: "created", newQuestion: "", optionsList: [], newOptionId: 0};
        } else {
            payload = { ...payload, errors: "Unable to create the event!"}
        }
    });
    return payload;
}

const fetchAnswerStats = async (payload) => {
    try{
        const url = `/host/qa_stats/?event_id=${payload.eventId}`
        await restClient.get(
            url
        ).then(async res => {
            payload = {
                ...payload,
                data: res.data
            }
        })
    }catch(error){
        console.log(error);
        payload = {
            ...payload,
            errors: "Couldn't fetch question answer stats"
        }
    }
    return payload;
}


const questionsMiddleware = storeAPI => next => async action => {
    switch(action.type){
        case FETCH_QUESTIONS:
            action.payload = await fetchAllQuestions(action.payload);
            break;
        case CREATE_QUESTION:
            action.payload = await createQuestion(action.payload);
            break;
        case FETCH_ANSWERS_STATS:
            action.payload = await fetchAnswerStats(action.payload);
        default:
            break;
    }
    return next(action);
}

export {
    questionsMiddleware
}
