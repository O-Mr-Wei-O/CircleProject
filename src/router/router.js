import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Bundle from './Bundle';
import Loading from 'components/Loading/Loading';

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';
import Register from 'bundle-loader?lazy&name=register!pages/Register/Register';
import Login from 'bundle-loader?lazy&name=login!pages/Login/Login';
import PersonalInfo from 'bundle-loader?lazy&name=personalInfo!pages/PersonalInfo/PersonalInfo';


const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);

export default () => (
    <div style={{height:'92%'}}>
        <Switch>
            <Route exact path="/" component={createComponent(Home)}/>
            <Route path="/register" component={createComponent(Register)}/>
            <Route path="/login" component={createComponent(Login)}/>
            <Route path="/personalInfo" component={createComponent(PersonalInfo)}/>
            <Route component={createComponent(NotFound)}/>
        </Switch>
    </div>
);
