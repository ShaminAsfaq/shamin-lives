import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

import Clock from './Clock';
import Chronicle from './Chronicle';
import Home from './Home';
import NotFound from './404';
import Spotify from './Spotify';
import FriendsRandom from './discover/FriendsRandom';

const Menu = () => {
    return(
        <div className="ui top secondary pointing menu" style={{ backgroundColor: 'white', position: 'fixed', width: '100%', top: '0', zIndex: '10', height: '50px' }}>
            <NavLink to="/" exact={true} className="item">
                Home
            </NavLink>
            <NavLink to="/create" className="item">
                Create
            </NavLink>
            <NavLink to="/discover" className="item">
                Magical Land of Narnia
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
                    <Route path='/discover' component={FriendsRandom} />
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
