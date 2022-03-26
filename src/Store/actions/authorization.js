import { VERIFY_TOKEN, LOGIN_USER } from "./actionTypes";

export const verifyToken = () => ({
    type: VERIFY_TOKEN,
    payload: ""
});

export const loginUser = ({username, password}) => ({
    type: LOGIN_USER,
    payload: { username, password, token: "" }
})

