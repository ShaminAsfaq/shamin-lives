import React from 'react';
import UsernameGenerator from 'username-generator';

import '../styles/components/Message.css';

const Message = ({user, message, timeStamp}) => {
    /**
     * username from localStorage
     */
    let foundUsername = localStorage.getItem('username');

    if(!foundUsername) {
        let anotherName = UsernameGenerator.generateUsername("-");
        localStorage.setItem('username', JSON.stringify(anotherName));
    } else {
        foundUsername = JSON.parse(foundUsername);
    }

    return(
        <div className='single-message-div'>
            {
                user===foundUsername &&
                <div>
                    <div className='single-message-inner-div-client'>
                        <div className='single-message-inner-div-client-user-name'>
                        {user}
                        <span className='single-message-inner-div-client-sub-text'>
                            {timeStamp}
                        </span>
                        </div>
                        <div>
                            {message}
                        </div>
                    </div>
                </div>
            }

            {
                user!==foundUsername &&
                <div className='single-message-inner-div-server'>
                    <div className='single-message-inner-div-server-user-name'>
                        {user}
                        <span className='single-message-inner-div-server-sub-text'>
                            {timeStamp}
                        </span>
                    </div>
                    <div>
                        {message}
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