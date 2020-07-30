import React from 'react';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';

import Clock from './Clock';
import Chronicle from './Chronicle';
import Home from './Home';
import NotFound from './404';

import MaterialHome from '../components/MaterialisticWorld/MaterialHome/MaterialHome';
import MaterialP2P from './MaterialisticWorld/MaterialP2P/MaterialP2P';

// import Spotify from './Spotify';
import FriendsRandom from './discover/FriendsRandom';
import Chat from './chat/Chat';
import Conference from './Simple-Peer/Conference';

import Placeholders from './Placeholders';

//  This dependency is useful to hide anything in the DOM from a specific browser/os etc.
//  Look up on npmjs
import {BrowserView, MobileView} from 'react-device-detect';

import '../styles/App.css';

const Menu = () => {
    return (
        <div className="ui top secondary pointing menu" style={{
            backgroundColor: 'white',
            position: 'fixed',
            width: '100%',
            top: '0',
            zIndex: '10',
            height: '50px'
        }}>
            <NavLink to="/" exact={true} className="item">
                Home
            </NavLink>
            {/*<NavLink to="/create" className="item">*/}
            {/*    Create*/}
            {/*</NavLink>*/}
            {/*<NavLink to="/discover" className="item">*/}
            {/*    Magical Land of Narnia*/}
            {/*</NavLink>*/}
            <NavLink to="/p2p" className="item">
                P2P Video
            </NavLink>
            <NavLink to="/material-p2p" className="item">
                Material P2P Video
            </NavLink>
            <div className="right menu">
                <div className="ui item">
                    <Clock/>
                </div>
            </div>F
        </div>
    )
}

const App = () => {
    return (
        <BrowserRouter>
            <div className='app-component' style={{display: 'flex', flexDirection: 'column'}}>
                {
                    // <Menu/>
                }
                <Switch>
                    {/*<Route path='/' component={Home} exact={true}/>*/}
                    <Route path='/' component={MaterialHome} exact={true}/>

                    <Route path='/material-p2p' component={MaterialP2P}/>
                    <Route path='/create' component={Chronicle}/>
                    <Route path='/discover' component={FriendsRandom}/>
                    <Route path='/placeholders' component={Placeholders}/>
                    <Route path='/p2p' component={Conference}/>
                    <Route component={NotFound}/>
                </Switch>
                {
                    // <Spotify />
                }
            </div>
            {
                // <Chat/>
            }
            {
                // <Conference/>
            }

        </BrowserRouter>
    );
}

export {
    App as default
}
