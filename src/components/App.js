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
import Content from './dashboard/Content';
import Dashboard from '../components/dashboard';
import Paperbase from '../dashboard/Paperbase';

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
                <Route path="/results" element={<ResultsPage />} />
                <Route path='/dashboard' element={<Paperbase />} />
                <Route path='/dashboard-2' element={<Dashboard />} />

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
            <Dashboard>
                {this.renderRoutes()}
            </Dashboard>
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