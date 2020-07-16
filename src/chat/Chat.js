import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import ScrollToBottom from 'react-scroll-to-bottom';

import '../styles/components/Chat.css';

const Chat = () => {
    let onSendMessage = () => {
        console.log('Hello !!');
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

    let isBlocked = false;

    let [visible, updateVisible] = useState(true);
    let [hiddenElement, updateHiddenElement] = useState([]);

    useEffect(() => {
        let foundDiv = document.getElementsByClassName('chat-window')

        if(foundDiv[0]) {
            let foundVisibility = document.getElementsByClassName('chat-window')[0].style.visibility;
            updateVisible(foundVisibility==='hidden'?false:true);
            updateHiddenElement(foundDiv[0]);
        }
    });

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
                    <MessageList/>
                    {
                        !isBlocked &&
                        <div className="ui big icon input chat-input">
                            <textarea className='chat-input-text-area' rows='2'></textarea>
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


