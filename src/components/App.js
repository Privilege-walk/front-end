import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Welcome from './Welcome';

class App extends React.Component {

    render() {
        return (
            <div>
                <Routes>
                    <Route exact path="/" element={<LoginForm />} />
                    <Route exact path="/signup" element={<SignupForm />} />
                    <Route path="/loggedin" element={<Welcome />} />
                </Routes>
            </div>
        );
    }

}

export default App;