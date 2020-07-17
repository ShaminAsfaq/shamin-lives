import React from 'react';
import Message from './Message';

const MessageList = (props) => {
    let availableMessages = props.availableMessages;

    let focusOnTextArea = () => {
        document.getElementsByClassName('chat-input-text-area')[0].focus();
    }

    return (
        <div className='message-list-div' onClick={focusOnTextArea}>
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
