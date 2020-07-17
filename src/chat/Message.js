import React from 'react';
import '../styles/components/Message.css';

const Message = ({user, message}) => {
    return(
        <div className='single-message-div'>
            {
                user==='client' &&
                <div className='single-message-inner-div-client'>
                    <div>{message}</div>
                </div>
            }

            {
                user==='server' &&
                <div className='single-message-inner-div-server'>
                    <div>{message}</div>
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