import React, { useState, useEffect } from 'react';
import Message from './Message';
import MessageList from './MessageList';
import ReactDOMServer from 'react-dom/server';
import io from 'socket.io-client';

/**
 * To send notification to desktop
 */
import addNotification, { Notifications } from 'react-push-notification';

import '../styles/components/Chat.css';

const Chat = () => {

    /**
     * Socket server URL
     */
    // let SOCKET_URL = 'http://118.179.95.206:5000';
    let SOCKET_URL = 'https://shamin-lives.now.sh';

    /**
     * Socket from socket.io-client
     */
    let socket = io(SOCKET_URL);

    /**
     * Dummy messages for the purpose of showcasing.
     */
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

    /**
     * Enabling state and other variables.
     */
    let isBlocked = false;   //  Emulates a blocked user.
    let [visible, updateVisible] = useState(true);  //  MessageList visibility. Works while closing the chat box.
    let [hiddenElement, updateHiddenElement] = useState([]);    //  Keeps the Chat Box to use if re-opened the closed chat box.
    let [messageList, updateMessageList] = useState(availableMessages); //  It will take the incoming messages from the server when we start working with socket.io

    /**
     * July 16th, 2020
     * Buggy. Takes the ENTER press twice, taking me into oblivion.
     * 
     * 1 day later:
     * July 17th, 2020
     * Update: Suddenly working perfectly. No idea why!!
     * 
     * @param {*} event 
     */
    const onEnter = (event) => {
        if(event.which === 13){
            onSendMessage();
            event.target.dispatchEvent(new Event("submit", {cancelable: true}));
            event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
        }
    }

    /**
     * Making the scroller go down at the bottom of the MessageList to view the latest message everytime.
     */
    const scrollDownToLatest = () => {
        var messages = document.getElementsByClassName("message-list-div")[0];
        if(messages){
            messages.scrollTop = messages.scrollHeight;
        }
    }

    /**
     * Works as ComponentDidMount() and ComponentDidUpdate() of a class based React Component.
     */
    useEffect(() => {
        /**
         * Socket connection check
         */
        // console.log(socket.connected);

        socket.on('connect', () => {
            // console.log(socket.connected);
            addNotification({
                title: 'Connected',
                subtitle: `Congratulations`,
                message: `Socket connection successful`,
                theme: 'red',
                native: true, // when using native, your OS will handle theming.
                icon: 'https://ae01.alicdn.com/kf/HTB1_WAoayYrK1Rjy0Fdq6ACvVXaa.jpg',
                duration: 10000
            });
        });

        socket.on('disconnect', () => {
            console.log(socket.connected);

            // socket.disconnect();
        });


        /**
         * Scroll to the bottom of the Message List
         */
        scrollDownToLatest();

        /**
         * Binding eventListener with the ENTER key to Send message if pressed.
         * 
         * isBlocked value is to showcase if user is blocked from the chat box. In case of TRUE,
         * the chat box won't render. No point of attempting to add an event listener to UNDEFINED.
         */
        let chatBox = document.getElementsByClassName("chat-input-text-area")[0];
        if(!isBlocked && chatBox) {
            chatBox.addEventListener("keypress", onEnter);
        }

    });

    /**
     * Removing any spaces from the beginning and the end of a message.
     * 
     * @param {*} string 
     */
    let trimSpaceOnlyFromStartAndEnd = (string) => {
        let len = string.length;
        let result = '';

        for(let idx=0; idx<len; idx++){
            if(string[idx]===' ') {
                continue;
            }
            result = string.substring(idx);
            break;
        }

        len = result.length;
        for(let idx=len-1; idx>=0; idx--){
            if(string[idx]===' ') {
                continue;
            }
            result = result.substring(0, idx+1);
            break;
        }

        return result;
    }

    /**
     * Executes if SEND button clicked. Also, if ENTER is pressed.
     * It sends the message to the server.
     */
    let onSendMessage = () => {
        let text = document.getElementsByClassName('chat-input-text-area')[0].value;
        text = trimSpaceOnlyFromStartAndEnd(text);

        if(text.length>0) {
            /**
             * Updating the state attribte that contains all the messages.
             * THis is not good, and shouldn't be done.
             */
            // let newMessage = {
            //     user: 'client',
            //     message: text
            // };
            // updateMessageList([...messageList, newMessage]);


            /**
             * Instead, adding new child to the MessageList div when sent.
             */
            let list = document.getElementsByClassName('message-list-div')[0];
            let node = <Message user={'client'} message={text}/>;
            node = ReactDOMServer.renderToStaticMarkup(node);
            var div = document.createElement('div');
            div.innerHTML = node.trim();
            node = div.firstChild;
            list.appendChild(node);

            scrollDownToLatest();
        }

        document.getElementsByClassName('chat-input-text-area')[0].value = '';
        document.getElementsByClassName('chat-input-text-area')[0].focus();
    };

    /**
     * Closes the chat box down.
     */
    let onCloseChatBox = () => {
        let foundDiv = document.getElementsByClassName('chat-window')

        if(foundDiv[0]) {
            let foundVisibility = document.getElementsByClassName('chat-window')[0].style.visibility;
            updateVisible(foundVisibility==='hidden'?true:false);
            updateHiddenElement(foundDiv[0]);
        } else {
            let foundVisibility = hiddenElement.style.visibility;
            updateVisible(foundVisibility==='hidden'?false:true);
        }
    }

    return(
        <div className='chat-one-above-all'>
            {
                visible &&
                <div className='chat-window'>
                    <div className='chat-box-head-wannabe' onClick={onCloseChatBox}>
                        <div className='chat-box-head'>
                            #general
                            <div onClick={onCloseChatBox} className='open-close-tag'>
                                close
                            </div>
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
                            {
                                /**
                                 * Send button: initially used when ENTER button didn't work as a sender.
                                 * "We're gonna be okay. You can rest now." [Endgame Easter Egg. Pepper Potts]
                                 */
                                // <button 
                                //     className="send-button" 
                                //     type="submit"
                                //     onClick={onSendMessage}
                                // >
                                // Send
                                // </button>
                            }
                        </div>
                    }
                    {
                        isBlocked &&
                        <div style={{textAlign:'center', color: 'red', paddingTop: '3.5%'}}>
                            Unfortunately, you have been blocked.
                        </div>
                    }
                </div>
            }
            {
                !visible &&
                <div className='chat-window-closed'>
                    <div className='chat-box-head-wannabe' onClick={onCloseChatBox}>
                        <div className='chat-box-head'>
                            #general
                            <div onClick={onCloseChatBox} className='open-close-tag'>
                                open
                            </div>
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


