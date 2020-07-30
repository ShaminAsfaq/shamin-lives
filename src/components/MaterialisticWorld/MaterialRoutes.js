import React from 'react';

import {Home, AccountCircle} from '@material-ui/icons';
import MaterialP2P from './MaterialP2P/MaterialP2P';
import FriendsRandom from '../../components/discover/FriendsRandom'
import Conference from '../Simple-Peer/Conference';

const WrapClassToFunctionMaterialP2P = () => {
    return (
        <MaterialP2P/>
    )
};

const WrapClassToFunctionConference = () => {
    return (
        <Conference/>
    )
};

const MaterialRoutes = [
    {
        path: '/material-p2p',
        sidebarName: 'Material P2P',
        navbarName: 'Material P2P',
        icon: Home,
        component: WrapClassToFunctionMaterialP2P
    },
    {
        path: '/discover',
        sidebarName: 'F.R.I.E.N.D.S',
        navbarName: 'F.R.I.E.N.D.S',
        icon: AccountCircle,
        component: FriendsRandom
    },
    {
        path: '/p2p',
        sidebarName: 'P2P Video Calling',
        navbarName: 'P2P Video Calling',
        icon: AccountCircle,
        component: WrapClassToFunctionConference
    },
];

export default MaterialRoutes;


