import React from 'react';

const UserJoinedOrLeft = ({user, joined, left}) => {
    return (
        <div className='user-joined-or-left'>
        {
            joined &&
            <div>{user} joined</div>
        }
        {
            left &&
            <div>{user} left</div>
        }
        </div>
    );
}


export {
    UserJoinedOrLeft as default
}

