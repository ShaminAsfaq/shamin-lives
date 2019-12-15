import React from 'react';
import Memento from './Memento';

const Home = () => {
    return (
        <div className="ui cards" style={{ justifyContent: 'center', paddingTop: '60px' }}>
            <Memento />
            <Memento />
            <Memento />
            <Memento />
            <Memento />
        </div>
    );
}

export {
    Home as default
}
