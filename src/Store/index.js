
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import {
    tokenReducer,
    finishedAuthCheckReducer
} from './reducers';

import { authenticationMiddleware, eventsMiddleware, questionsMiddleware } from './middleware';

const store = configureStore({
    reducer:{
        token: tokenReducer,
        finishedAuthCheck: finishedAuthCheckReducer,
    },
    preloadedState : {},
    middleware: [thunkMiddleware, authenticationMiddleware, eventsMiddleware, questionsMiddleware]
})



export{ store };