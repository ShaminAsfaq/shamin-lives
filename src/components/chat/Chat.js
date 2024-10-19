import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import io from 'socket.io-client';
import UsernameGenerator from 'username-generator';

import publicIp from 'public-ip';
import axios from 'axios';

/**
 * To send notification to desktop
 */
import addNotification from 'react-push-notification';

import '../../styles/components/Chat.css';

const Chat = () => {
    /**
     * Socket server URL
     */
    // let SOCKET_URL = 'http://118.179.95.206:5000';
    // let SOCKET_URL = 'https://shamin-lives-server.herokuapp.com'
    let SOCKET_URL = 'https://shamin-lives-server.onrender.com';    //  Heroku is discontinued. Now deployed on RENDER

    // Initialize socket connection using useRef
    const socketRef = useRef(null);

    /**
     * Socket from socket.io-client --> Bad Approach
     */
    // let socket = io.connect(SOCKET_URL, {'transports': ['websocket', 'polling']});
    
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

    let [typing, updateTyping] = useState(false);

    let notify = new Audio('/media/beep.mp3');

    /**
     * Latest State of MessageListRef
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
            inputRef.addEventListener("keyup", onKeyUp);
            inputRef.addEventListener("keydown", onKeyDown);
            inputRef.focus();
        }
    }, [inputRef])

    /**
     * UseEffect for username
     */
    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io.connect(SOCKET_URL, { 'transports': ['websocket', 'polling'] });
        }

        const socket = socketRef.current;

        if(username.length>0) {

            console.log(username);

            /**
             * Joining the chat
             * 
             * ipServer helps get the location of a user.
             */
            let ipServer ='https://api.ipdata.co?api-key=546b5127a6a5109396e7ef96c618584caf74359af29e9b1f072c2e34';

            axios.get(ipServer).then(({ data }) => {
                console.log('IP WORKED')
                let { region, country_name, emoji_flag } = data;
                socket.emit('joined', {user: username, region, country_name, emoji_flag});
            }).catch((e) => {
                console.log('FAILED')
                socket.emit('joined', {user: username, region: '', country_name: '', emoji_flag: ''});
                // console.log(e)
            })

            socket.on('joined', (data) => {
                // console.log(data)
                let currentMessageList = updatedMeetingListRef.current;
                setUpdatedMeetingList([...currentMessageList, data]);    
            });

            /**
             * When connects
             */
            socket.emit('get-temp-messages', {user: username});
            socket.on('get-temp-messages', (data) => {
                let socketIOlogo = '/media/chat.png';
                pushNotification('Connected', 'Socket successful', 'Welcome to the chat!', socketIOlogo, 3000);
                // console.log(data);
                setUpdatedMeetingList(data);
            });

            socket.on('left', (data) => {
                // console.log(data)
                let currentMessageList = updatedMeetingListRef.current;
                setUpdatedMeetingList([...currentMessageList, data]);
            });

            socket.on('message', (data) => {
                // console.log(data);
                // console.log(username);
                if(data.user!==username){
                    notify.play();
                }
                let currentMessageList = updatedMeetingListRef.current;
                setUpdatedMeetingList([...currentMessageList, data]);
                // console.log(updatedMeetingListRef.current)
            })

            socket.on('typing', (data) => {
                if(data.typing) {
                    updateTyping(true);
                } else {
                    updateTyping(false);
                }
            })

            socket.on('disconnect', () => {
                // console.log('I am here')
                socket.disconnect();
            });
        }
    }, [username])


    /**
     * Works as ComponentDidMount() and ComponentDidUpdate() of a class based React Component.
     * 
     * Running once, as the following empty array is never gonna change.
     */
    useEffect(() => {
        //  Detecting IP of client
        publicIp.v4().then(e => console.log(e))

        // console.log(window.location.hostname)
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

        notify.muted=true;
        notify.play().catch(e => {
            // console.log('failed')
        });
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

        const socket = socketRef.current;

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

    /**
     * Answer from: https://stackoverflow.com/a/57763036/5554993
     * 
     * The following two methods send socket server a signal that user has stopped typing.
     * 
     * @param {*} callback 
     * @param {*} wait 
     */
    let debounce = (callback, wait) => {
        let timeout;
        return (...args) => {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => callback.apply(context, args), wait);
        };
    }

    let onKeyUp = debounce(() => {
        const socket = socketRef.current;
        // code you would like to run 1000ms after the keyup event has stopped firing
        // further keyup events reset the timer, as expected
        socket.emit('typing', {user: username, typing: false});
        // console.log('This is some Text');
    }, 750);

    let onKeyDown = debounce((event) => {
        if (event.which!==13) {

            if(event.which===186) {
                console.log('COLON');
            }

            const socket = socketRef.current;
            socket.emit('typing', {user: username, typing: true})
        }
    }, 100)


    //  Floating Chat Box - START
    // return(
    //     <div className='chat-one-above-all'>
    //         {
    //             visible &&
    //             <div className='chat-window'>
    //                 <div className='chat-box-head-wannabe' onClick={onCloseChatBox}>
    //                     <div className='chat-box-head'>
    //                         #general
    //                         <div onClick={onCloseChatBox} className='open-close-tag'>
    //                             close
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <MessageList availableMessages={updatedMeetingList} typing={typing}/>
    //                 {
    //                     !isBlocked &&
    //                     <div className="ui big icon input chat-input">
    //                         <textarea
    //                             ref={(input) => { updateInputRef(input) }}
    //                             className='chat-input-text-area'
    //                             placeholder={`Your are: ${username}`}
    //                             value={inputValue}
    //                             onChange={(e) => {
    //                                 updateInputValue(e.target.value)
    //                             }}
    //                         >
    //                         </textarea>
    //                         {
    //                             /**
    //                              * Send button: initially used when ENTER button didn't work as a sender.
    //                              * "We're gonna be okay. You can rest now." [Endgame Easter Egg. Pepper Potts]
    //                              */
    //                             // <button
    //                             //     className="send-button"
    //                             //     type="submit"
    //                             //     onClick={onSendMessage}
    //                             // >
    //                             // Send
    //                             // </button>
    //                         }
    //                     </div>
    //                 }
    //                 {
    //                     isBlocked &&
    //                     <div style={{textAlign:'center', color: 'red', paddingTop: '3.5%'}}>
    //                         Unfortunately, you have been blocked.
    //                     </div>
    //                 }
    //             </div>
    //         }
    //         {
    //             !visible &&
    //             <div className='chat-window-closed'>
    //                 <div className='chat-box-head-wannabe' onClick={onCloseChatBox}>
    //                     <div className='chat-box-head'>
    //                         #general
    //                         <div onClick={onCloseChatBox} className='open-close-tag'>
    //                             open
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         }
    //     </div>
    // );
    //  Floating Chat Box - END

    return(
        <div className='main-chat-window'>
            {
                visible &&
                <div className='chat-header-fullscreen'>
                    <MessageList availableMessages={updatedMeetingList} typing={typing}/>
                    {
                        !isBlocked &&
                        <div className="ui big icon input chat-input-fullscreen">
                            <textarea
                                ref={(input) => { updateInputRef(input) }}
                                className='chat-input-text-area-fullscreen'
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


