import { 
    CREATE_QUESTION, 
    FETCH_QUESTIONS,
    FETCH_ANSWERS_STATS
 } from "./actionTypes"

export const fetchQuestions = ({params}) => ({
    type: FETCH_QUESTIONS,
    payload: { params }
})

export const createQuestion = ({requestBody}) => ({
    type: CREATE_QUESTION,
    payload: { requestBody }
})

export const fetchAnswerStats = ({eventId}) => ({
    type: FETCH_ANSWERS_STATS,
    payload: { eventId }
})