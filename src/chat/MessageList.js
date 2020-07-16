import React from 'react';
import Message from './Message';

const MessageList = () => {

    let availableMessages = [
        {
            user: 'client',
            message: 'Sent by me.'
        },
        {
            user: 'server',
            message: 'Sent from server.'
        },
        {
            user: 'server',
            message: 'Another one sent from server.'
        },
        {
            user: 'server',
            message: 'Yet another.'
        },
        {
            user: 'client',
            message: 'I know!! Stop now.'
        },
        {
            user: 'client',
            message: 'Or I will block you.'
        },
        {
            user: 'server',
            message: 'Okay, I will stop, but only if you say you love me.'
        },
        {
            user: 'client',
            message: 'Ugh.. alright.'
        },
        {
            user: 'client',
            message: 'I hate you.'
        },
    ];


    return (
        <div className='message-list-div'>
            {
                availableMessages.map(
                    ({user, message}, i) => <Message key={i} user={user} message={message}/>
                )
            }
        </div>
    );
}


export {
    MessageList as default
}
