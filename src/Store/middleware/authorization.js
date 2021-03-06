import { LOGIN_USER, SIGNUP_USER, VERIFY_TOKEN } from "../actions/actionTypes";
import { restClient } from "../../api/restInterceptor";


const verifyToken = () => {
    let token = localStorage.getItem("token");
    if (token){
        return true;
    }else{
        return false;
    }
}

const signupUser = async (payload) => {
    await restClient.post("/auth/signup/", payload).then(async res => {
        payload = { ...payload, created: res.data.created};
    }) 
    return payload;
}


const loginUser = async (payload) => {
    try{ 
        const {username, password} = payload;
        await restClient.post(
            `/auth/login/`, 
            { username, password }
        ).then(async res => {
            let token = "";
            if (res.data.status === true) {
                token = res.data.token;  
                localStorage.setItem("token", token); 
            } 
            payload = { ...payload, token}
        });
        return payload;
    }catch(error){
        console.log(error);
    }
     
}

const authenticationMiddleware = storeAPI => next => async action => {
    switch(action.type){
        case VERIFY_TOKEN:
            action.payload = await verifyToken();
            break;
        case SIGNUP_USER:
            action.payload = await signupUser(action.payload);
            break;
        case LOGIN_USER:
            action.payload = await loginUser(action.payload);
            break;
    }
    return next(action);
}

export {
    authenticationMiddleware
}