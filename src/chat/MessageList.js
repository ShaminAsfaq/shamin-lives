import React from 'react';
import Message from './Message';

const MessageList = (props) => {
    let availableMessages = props.availableMessages;
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
