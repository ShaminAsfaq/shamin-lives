import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import MessageList from './MessageList';
import ReactDOMServer from 'react-dom/server';
import io from 'socket.io-client';
import UsernameGenerator from 'username-generator';

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
    let SOCKET_URL = 'https://shamin-lives-server.herokuapp.com';

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

    // availableMessages = [];
    
    /**
     * Enabling state and other variables.
     */
    let isBlocked = false;   //  Emulates a blocked user.
    let [visible, updateVisible] = useState(true);  //  MessageList visibility. Works while closing the chat box.
    let [hiddenElement, updateHiddenElement] = useState([]);    //  Keeps the Chat Box to use if re-opened the closed chat box.
    let [messageList, updateMessageList] = useState([]); //  It will take the incoming messages from the server when we start working with socket.io
    let [username, updateUsername] = useState('');

    let [inputValue, updateInputValue] = useState('');
    let [inputRef, updateInputRef] = useState(null);

    /**
     * Test Ref
     */
    let [updatedMeetingList, setUpdatedMeetingList] = useState([]);
    let updatedMeetingListRef = useRef(updatedMeetingList);
    

    /**
     * UseEffect for updatedMeetingList. It takes out only the most latest version of the state
     * from a series of Snapshot of states.
     */
    useEffect(() => {
        updatedMeetingListRef.current = updatedMeetingList;
    }, [updatedMeetingList]);


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
        /**
         * For some reason, updateInputValue() is not updaing the string as a string. It's only tracking
         * one single character. Now using InputRef to get the value.
         */
        if(event.which === 13){
            onSendMessage();
            event.target.dispatchEvent(new Event("submit", {cancelable: true}));
            event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
        }
    }


    let pushNotification = (title, subtitle, message, imgURL, duration) => {
        addNotification({
            title,
            subtitle,
            message,
            theme: 'red',
            native: true, // when using native, your OS will handle theming.
            icon: imgURL,
            duration
        });
    }

    /**
     * UseEffect for inputRef
     */
    useEffect(() => {
        if(inputRef){
            inputRef.addEventListener("keypress", onEnter);
            inputRef.focus();
        }
    }, [inputRef])


    /**
     * UseEffect for username
     */
    useEffect(() => {
        if(username.length>0) {
            // console.log(username);
            /**
             * Joining the chat
             */
            socket.emit('joined', {user: username});

            socket.on('joined', (data) => {
                let currentMessageList = updatedMeetingListRef.current;
                setUpdatedMeetingList([...currentMessageList, data]);    
            });

            socket.on('left', (data) => {
                // console.log(data)
                let currentMessageList = updatedMeetingListRef.current;
                setUpdatedMeetingList([...currentMessageList, data]);
            });
        }
    }, [username])


    /**
     * UseEffect for MessageList
     */
    useEffect(() => {
        /**
         * Socket connection check
         */
        // console.log(socket.connected);

        let socketIOlogo = 'https://pbs.twimg.com/profile_images/470682672235151360/vI0ZZlhZ_400x400.png';
        socket.on('connect', (data) => {
            // pushNotification('Connected', 'Socket successful', 'Connected to socket server', socketIOlogo, 1000);
        });

        socket.on('message', (data) => {
            let currentMessageList = updatedMeetingListRef.current;
            setUpdatedMeetingList([...currentMessageList, data]);
            // console.log(updatedMeetingListRef.current)
        })

        socket.on('welcome', (data) => {
            let tempArray = [];
            
            data = Object.entries(data);            
            data.map(item => {
                tempArray.push(item[1])
            })
            tempArray = tempArray[0];

            let currentMessageList = updatedMeetingListRef.current;
            setUpdatedMeetingList([...currentMessageList, tempArray]);

            // console.log(updatedMeetingListRef.current)
        })

        socket.on('disconnect', () => {
            console.log('I am here')
            socket.disconnect();
        });

    }, [messageList])


    /**
     * Works as ComponentDidMount() and ComponentDidUpdate() of a class based React Component.
     */
    useEffect(() => {
        /**
         * username from localStorage
         */
        let foundUsername = localStorage.getItem('username');

        if(!foundUsername) {
            let anotherName = UsernameGenerator.generateUsername("-");
            localStorage.setItem('username', JSON.stringify(anotherName));
            updateUsername(anotherName);
        } else {            
            foundUsername = JSON.parse(foundUsername);            
            updateUsername(foundUsername);
        }
    }, []);

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
         * Getting 12 HOURS format time in JavaScript.
         * From StackOverflow answer: https://stackoverflow.com/a/36822046/5554993
         */
        let getTimeIn12HourClock = () => {
            let timeStamp = new Date();
            return timeStamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        }

    /**
     * Executes if SEND button clicked. Also, if ENTER is pressed.
     * It sends the message to the server.
     */
    let onSendMessage = () => {
        let text = inputRef.value;
        // console.log(text)
        text = trimSpaceOnlyFromStartAndEnd(text);

        if(text.length>0) {
            socket.emit('message', {user: username, message: text, timeStamp: getTimeIn12HourClock()});
        }
        updateInputValue('');
    };

    /**
     * Closes the chat box down.
     */
    let onCloseChatBox = () => {
        /**
         * Change it USING ref
         */

        // let foundDiv = document.getElementsByClassName('chat-window')

        // if(foundDiv[0]) {
        //     let foundVisibility = document.getElementsByClassName('chat-window')[0].style.visibility;
        //     updateVisible(foundVisibility==='hidden'?true:false);
        //     updateHiddenElement(foundDiv[0]);
        // } else {
        //     let foundVisibility = hiddenElement.style.visibility;
        //     updateVisible(foundVisibility==='hidden'?false:true);
        // }
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
                    <MessageList availableMessages={updatedMeetingList}/>
                    {
                        !isBlocked &&
                        <div className="ui big icon input chat-input">
                            <textarea 
                                ref={(input) => { updateInputRef(input) }}
                                className='chat-input-text-area' 
                                placeholder={`Your are: ${username}`}
                                value={inputValue}
                                onChange={(e) => {
                                    updateInputValue(e.target.value)
                                }}
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


