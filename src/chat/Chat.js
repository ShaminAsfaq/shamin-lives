import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import ScrollToBottom from 'react-scroll-to-bottom';

import '../styles/components/Chat.css';

const Chat = () => {

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


    let isBlocked = false;
    let [visible, updateVisible] = useState(true);
    let [hiddenElement, updateHiddenElement] = useState([]);
    let [messageList, updateMessageList] = useState(availableMessages);
    let counter = 0;

    const onEnter = (event) => {
        if(event.which === 13){
            event.target.dispatchEvent(new Event("submit", {cancelable: true}));
            event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
        }
    }


    useEffect(() => {
        let foundDiv = document.getElementsByClassName('chat-window')

        if(foundDiv[0]) {
            let foundVisibility = document.getElementsByClassName('chat-window')[0].style.visibility;
            updateVisible(foundVisibility==='hidden'?false:true);
            updateHiddenElement(foundDiv[0]);
        }

        document.getElementsByClassName("chat-input-text-area")[0].addEventListener("keypress", onEnter);

    });    

    let onSendMessage = () => {
        let text = document.getElementsByClassName('chat-input-text-area')[0].value;

        let newMessage = {
            user: 'client',
            message: text
        };
        updateMessageList([...messageList, newMessage]);
        document.getElementsByClassName('chat-input-text-area')[0].value = '';
    };

    let onCloseChatBox = () => {
        let foundDiv = document.getElementsByClassName('chat-window')

        if(foundDiv[0]) {
            let foundVisibility = document.getElementsByClassName('chat-window')[0].style.visibility;
            updateVisible(foundVisibility==='hidden'?true:false);
        } else {
            let foundVisibility = hiddenElement.style.visibility;
            updateVisible(foundVisibility==='hidden'?false:true);
        }
    }

    return(
        <div>
            {
                visible &&
                <div className='chat-window'>
                    <div className='chat-box-head-wannabe'>
                        <div className='chat-box-head'>
                            #general
                            <button onClick={onCloseChatBox} className='close-button'>
                                close
                            </button>
                        </div>
                    </div>
                    <MessageList availableMessages={messageList}/>
                    {
                        !isBlocked &&
                        <div className="ui big icon input chat-input">
                            <textarea 
                                className='chat-input-text-area' 
                                placeholder='Your message..'
                            >
                            </textarea>
                            <button 
                                className="send-button" 
                                type="submit"
                                onClick={onSendMessage}
                            >
                            Send
                            </button>
                        </div>
                    }
                    {
                        isBlocked &&
                        <div style={{textAlign:'center', color: 'red', paddingTop: '7%'}}>
                            Unfortunately, you have been blocked.
                        </div>
                    }
                </div>
            }
            {
                !visible &&
                <div className='chat-window-closed'>
                    <div className='chat-box-head-wannabe'>
                        <div className='chat-box-head'>
                            #general
                            <button onClick={onCloseChatBox} className='close-button'>
                                open
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}


export {
    Chat as default
}


