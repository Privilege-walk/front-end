import React from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ProtectedRoute from './ProtectedRoute';
import Events from './Events';
import Questions from './Questions';
import { UserLiveEvent, HostLiveEvent } from './Walk';
import ResultsPage from './Walk/ResultsPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderRoutes = () => {
        return (
            <Routes>
                <Route exact path="/" element={<Navigate to="/login" />} />
                <Route exact path="/login" element={<LoginForm />} />
                <Route exact path="/signup" element={<SignupForm />} />
                {/* <Route exact path="/event/host/live" element={<UserQRCode  />} /> */}
                <Route  path="/walk/:eventId" element={<UserLiveEvent />} />
                <Route path="/results/:eventId/:uniqueCode" element={<ResultsPage />} />

                {/* All Protected routes */}
                <Route  element={<ProtectedRoute />}>
                    <Route  path="/host/walk/:eventId" element={<HostLiveEvent />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/questions" element={<Questions />} />
                </Route>
                <Route
                    path="*"
                    element={<Navigate to="/events" replace />}
                />
                
            </Routes>
        );
    }

    render() {
        return (
            <div>
                {this.renderRoutes()}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        token: state.token,
        finishedAuthCheck: state.finishedAuthCheck
    };
};

var AppContainer = connect(mapStateToProps)(App);
export default AppContainer;