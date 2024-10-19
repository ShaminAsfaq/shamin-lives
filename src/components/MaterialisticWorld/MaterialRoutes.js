import React from 'react';

import {AccountCircle} from '@material-ui/icons';
import MaterialP2P from './MaterialP2P/MaterialP2P';
import FriendsRandom from '../../components/discover/FriendsRandom'
import Conference from '../Simple-Peer/Conference';
import EducationBoardResultBD from './EducationBoardResultBD/EducationBoardResultBD';
import Redditor from "../reddit/Redditor";
import Home from "../Home";
import Chat from "../chat/Chat";

const WrapClassToFunctionOldHome = () => {
    return (
        <Home/>
    )
}

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

const WrapClassToFunctionEducationBoardReusltBD = () => {
    return (
        <EducationBoardResultBD/>
    );
};

const WrapClassToFunctionChat = () => {
    return (
        <Chat/>
    )
};

const MaterialRoutes = [
    // {
    //     //Failed Attempt. Apparently, Govt of Bangladesh is keeping some piece of junk php guys who only knows SOAP
    //
    //     path: '/education-board-result-bd',
    //     sidebarName: 'Board Exam Result BD',
    //     navbarName: 'Education Board Exam Result BD',
    //     icon: AccountCircle,
    //     component: WrapClassToFunctionEducationBoardReusltBD
    // },
    // {
    //     path: '/discover',
    //     sidebarName: 'F.R.I.E.N.D.S',
    //     navbarName: 'F.R.I.E.N.D.S',
    //     icon: AccountCircle,
    //     component: FriendsRandom
    // },
    {
        path: '/public-chat',
        sidebarName: 'Public Chat',
        navbarName: 'Public Chat',
        icon: AccountCircle,
        component: WrapClassToFunctionChat
    },
    {
        path: '/material-p2p',
        sidebarName: 'Material P2P',
        navbarName: 'Material P2P',
        icon: AccountCircle,
        component: WrapClassToFunctionMaterialP2P
    },
    // {
    //     path: '/p2p',
    //     sidebarName: 'P2P Video Calling',
    //     navbarName: 'P2P Video Calling',
    //     icon: AccountCircle,
    //     component: WrapClassToFunctionConference
    // },
    // {
    //     path: '/material-reddit',
    //     sidebarName: 'Reddit',
    //     navbarName: 'Reddit',
    //     icon: AccountCircle,
    //     component: WrapClassToFunctionOldHome
    // },
];

export default MaterialRoutes;


