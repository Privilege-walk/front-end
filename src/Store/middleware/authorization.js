import { LOGIN_USER, VERIFY_TOKEN } from "../actions/actionTypes";
import { restClient } from "../../api/restInterceptor";


const verifyToken = () => {
    let token = localStorage.getItem("token");
    if (token){
        return true;
    }else{
        return false;
    }
}

const loginUser = async (payload) => {
    const {username, password} = payload;
    await restClient.post(
        `/auth/login/`, 
        { username, password }
    ).then(async res => {
        let token = "";
        console.log(res);
        if (res.data.status === true) {
            token = res.data.token;  
            localStorage.setItem("token", token); 
        } 
        payload = { ...payload, token}
    });
    console.log("login payload", password);
    return payload;
     
}

const authenticationMiddleware = storeAPI => next => async action => {
    console.log("authenticationMiddleware", action);
    switch(action.type){
        case VERIFY_TOKEN:
            action.payload = await verifyToken();
            break;
        case LOGIN_USER:
            action.payload = await loginUser(action.payload);
    }
    return next(action);
}

export {
    authenticationMiddleware
}