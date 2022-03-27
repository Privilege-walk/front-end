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

                {/* All Protected routes */}
                <Route  element={<ProtectedRoute />}>
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