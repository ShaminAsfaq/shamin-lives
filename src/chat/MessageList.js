import React, { useState, useEffect } from 'react';
import Message from './Message';

const MessageList = (props) => {
    let [messageListRef, updateMessageListRef] = useState(null);
    let availableMessages = props.availableMessages;

    useEffect(() => {
        if(messageListRef) {
            messageListRef.scrollTop = messageListRef.scrollHeight;
        }
    }, [availableMessages])

    // console.log(availableMessages)

    let focusOnTextArea = () => {
        /**
         * To make the TextArea selected if clicked inside message list.
         * Buggy, becasue it doesn't allow you to copy any text from a message.
         */
        // document.getElementsByClassName('chat-input-text-area')[0].focus();
    }

    return (
        <div 
            className='message-list-div' 
            onClick={focusOnTextArea}
            ref={(input) => { updateMessageListRef(input) }}
        >
            {
                availableMessages.map(
                    ({user, message, timeStamp}, i) => <Message key={i} user={user} message={message} timeStamp={timeStamp}/>
                )
            }
        </div>
    );
}


export {
    MessageList as default
}
