import React, { Component } from 'react';
import {
  Routes,
  Route,
//   Link
} from "react-router-dom";
import LoginForm from './LoginForm';
import Welcome from './Welcome';

class App extends React.Component {

    render() {
        // return (
        //     // <div>
        //     //     <h1>Hello World!</h1>
        //     // </div>
        //     <LoginForm />
        // );
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