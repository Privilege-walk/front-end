import { CREATE_QUESTION, FETCH_QUESTIONS } from "./actionTypes"

export const fetchQuestions = ({params}) => ({
    type: FETCH_QUESTIONS,
    payload: { params }
})

export const createQuestion = ({requestBody}) => ({
    type: CREATE_QUESTION,
    payload: { requestBody }
})