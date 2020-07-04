import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login';
import Admin from './Admin';
import SignUp from './SignUp';

const Main = () => {

    return (
    <div>
    <Router>
    <Route path='/login' exact component={Login} />
    <Route path='/admin/' component={Admin} />
    <Route path='/signup' exact component={SignUp} />
    </Router>
    </div>

    );
};

export default Main;