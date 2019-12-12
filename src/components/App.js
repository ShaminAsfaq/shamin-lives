import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

import Clock from './Clock';
import Chronicle from './Chronicle';
import Home from './Home';
import NotFound from './404';
import Spotify from './Spotify';

const Menu = () => {
    return(
        <div className="ui top fixed secondary pointing menu" style={{ backgroundColor: 'white' }}>
            <NavLink to="/" exact={true} className="item">
                Home
            </NavLink>
            <NavLink to="/create" className="item">
                Create
            </NavLink>
            <div className="right menu">
                <div className="ui item">
                <Clock />
                </div>
            </div>
        </div>
    )
}

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Menu />
                <Switch>
                    <Route path='/' component={Home} exact={true}/>
                    <Route path='/create' component={Chronicle}/>
                    <Route component={NotFound}/>
                </Switch>
                <Spotify />
             </div>
        </BrowserRouter>
    );
}

export {
    App as default
}
