import React from 'react';
import '../styles/components/Message.css';

const Message = ({user, message}) => {
    /**
     * Getting 12 HOURS format time in JavaScript.
     * From StackOverflow answer: https://stackoverflow.com/a/36822046/5554993
     */
    let timeStamp = new Date();
    timeStamp = timeStamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    return(
        <div className='single-message-div'>
            {
                user==='client' &&
                <div>
                    <div className='single-message-inner-div-client'>
                        <div>
                            {message}
                            <div className='single-message-inner-div-client-sub-text'>{timeStamp}</div>
                        </div>
                    </div>
                </div>
            }

            {
                user==='server' &&
                <div className='single-message-inner-div-server'>
                    <div>
                        {message}
                        <div className='single-message-inner-div-server-sub-text'>{timeStamp}</div>
                    </div>
                </div>
            }
        </div>
    );
}


export {
    Message as default
}





{
    // Old Return Value of Message Component:

    // <div className='single-message-div'>
    //     <span className='single-message-span'>
    //         abracadabracabracadabracabracadabracabracadabracabracadabracabracadabracabracadabracabracadabrac
    //     </span>
    // </div>
}