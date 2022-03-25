import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Events from './Events';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstPage: "login",
            loggedIn: false
        }
    }

    changeFirstPage = (firstPage) => {
        this.setState({ firstPage },()=>console.log("HAHAHAHAHA: ",this.state.firstPage));
    }

    renderPages = () => {
        
        if (!this.props.token && this.state.firstPage === 'login') {
            return (<LoginForm setFirstPage={this.changeFirstPage} />);
        } else if (this.state.firstPage === 'signup') {
            return (<SignupForm setFirstPage={this.changeFirstPage} />);
        } else {
            return this.renderRoutes();
        }
    }

    renderRoutes = () => {
        return (
            <Routes>
                <Route exact path="/" element={<LoginForm />} />
                <Route exact path="/signup" element={<SignupForm />} />
                <Route path="/events" element={<Events />} />
            </Routes>
        );
    }

    render() {
        return (
            <div>
                {this.renderPages()}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        token: state.authToken
    };
};

var AppContainer = connect(mapStateToProps)(App);
export default AppContainer;