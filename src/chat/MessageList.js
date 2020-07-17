import React from 'react';
import Message from './Message';

const MessageList = (props) => {
    let availableMessages = props.availableMessages;

    let focusOnTextArea = () => {
        /**
         * To make the TextArea selected if clicked inside message list.
         * Buggy, becasue it doesn't allow you to copy any text from a message.
         */
        // document.getElementsByClassName('chat-input-text-area')[0].focus();
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
