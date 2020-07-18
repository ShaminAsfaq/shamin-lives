import React from 'react';

const UserJoinedOrLeft = ({user, joined, left}) => {
    return (
        <div className='user-joined-or-left'>
        {
            joined &&
            <div>
                {user}
                <span className='joined-chat'> joined</span>
            </div>
        }
        {
            left &&
            <div>
                {user}
                <span className='left-chat'> left</span>
            </div>
        }
        </div>
    );
}


export {
    UserJoinedOrLeft as default
}

