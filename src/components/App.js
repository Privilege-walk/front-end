import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";

import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ProtectedRoute from './ProtectedRoute';
import Events from './Events';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderRoutes = () => {
        return (
            <Routes>
                <Route exact path="/login" element={<LoginForm />} />
                <Route exact path="/signup" element={<SignupForm />} />

                {/* All Protected routes */}
                <Route  element={<ProtectedRoute />}>
                    <Route path="/events" element={<Events />} />
                </Route>
                
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