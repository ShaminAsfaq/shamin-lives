import React from 'react';
import UsernameGenerator from 'username-generator';

import '../styles/components/Message.css';

const Message = ({user, message, timeStamp, avatar}) => {
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
                <span style={{display: 'flex'}}>
                    <div className='user-avatar'>
                        <img className="ui avatar image" src={avatar}/>
                    </div>
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
                </span>
            }

            {
                user!==foundUsername &&
                <span style={{display: 'flex', flexDirection: 'row-reverse'}}>
                    <div className='user-avatar'>
                        <img className="ui avatar image" src={avatar}/>
                    </div>
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
                </span>
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