import React, { useEffect } from 'react';
import MessageList from './MessageList';
import ScrollToBottom from 'react-scroll-to-bottom';

import '../styles/components/Chat.css';

const Chat = () => {
    let onSendMessage = () => {
        console.log('Hello !!');
    };

    let onCloseChatBox = () => {
        console.log('Toss a coin to your witcher');
    }

    useEffect(() => {});

    return(
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
            <div className="ui big icon input chat-input">
     
                {
                    // <input type="text" placeholder="Your message..." className='chat-input-text-field'/>
                }
                <textarea className='chat-input-text-area' rows='2'></textarea>
                <button 
                    className="send-button" 
                    type="submit"
                    onClick={onSendMessage}
                >
                Send
                </button>
            </div>
        </div>
    );
}


export {
    Chat as default
}


