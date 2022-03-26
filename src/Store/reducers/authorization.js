import { LOGIN_USER, VERIFY_TOKEN, LOG_OUT_USER } from "../actions/actionTypes";

const tokenReducer = (state='', action) => {
    let currentState = state;
    console.log("tokenReducer", action);
    switch(action.type){
        case LOGIN_USER:
            return action.payload.token; 
        default:
            return currentState
    }
}

const finishedAuthCheckReducer = (state=false, action) => {
    let  finished = state;
    
    switch(action.type){ 
        case VERIFY_TOKEN:
            return true;
        case LOGIN_USER:
            return true;
        case LOG_OUT_USER:
            return false;
        default:
            return finished;
    }
    
};

export {
    tokenReducer, finishedAuthCheckReducer
}