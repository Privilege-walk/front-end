import { VERIFY_TOKEN, LOGIN_USER, SIGNUP_USER } from "./actionTypes";

export const verifyToken = () => ({
    type: VERIFY_TOKEN,
    payload: ""
});

export const loginUser = ({username, password}) => ({
    type: LOGIN_USER,
    payload: { username, password, token: "" }
});

export const signupUser = ({first_name, last_name, username, password, email}) => ({
    type: SIGNUP_USER,
    payload: {
        first_name, last_name, username, 
        password, email,
        created: "Failed, please try again!"
    }
})

