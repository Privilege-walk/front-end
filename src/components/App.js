import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import LoginForm from './LoginForm';
import Welcome from './Welcome';

class App extends React.Component {

    render() {
        return (
            <div>
                <Routes>
                    <Route exact path="/" element={<LoginForm />} />
                    <Route path="/loggedin" element={<Welcome />} />
                </Routes>
            </div>
        );
    }

}

export default App;