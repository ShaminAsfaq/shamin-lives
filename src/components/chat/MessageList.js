import React, { useState, useEffect } from 'react';
import Message from './Message';
import UserJoinedOrLeft from './UserJoinedOrLeft';
import { v4 as uuidv4 } from 'uuid';


const MessageList = (props) => {
    let [messageListRef, updateMessageListRef] = useState(null);
    let availableMessages = props.availableMessages;
    let typing = props.typing;

    useEffect(() => {
        if(messageListRef) {
            messageListRef.scrollTop = messageListRef.scrollHeight;
        }
    }, [availableMessages, messageListRef])

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
                    (item, i) => {
                        let {user, joined, avatar, left, message, timeStamp, region, country_name, emoji_flag} = item;
                        
                        let locationData = {region, country_name, emoji_flag}

                        if(joined || left) {
                            let username = JSON.parse(localStorage.getItem('username'));

                            if(username===user) {
                                return <UserJoinedOrLeft key={uuidv4()} user={'You'} joined={joined} left={left} locationData={locationData}/>
                            } else {
                                return <UserJoinedOrLeft key={uuidv4()} user={user} joined={joined} left={left} locationData={locationData}/>
                            }
                        } else {
                            return <Message key={i} user={user} message={message} timeStamp={timeStamp} avatar={avatar}/>
                        }
                    }
                )
            }
            {
                typing &&
                <div className='user-is-typing-message'>
                    Someone is typing...
                </div>
            }
        </div>
    );
}


export {
    MessageList as default
}
