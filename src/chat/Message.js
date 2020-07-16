import React from 'react';


const Message = ({user, message}) => {
    
    return(
        <div>
            {
                user==='client' &&
                <div className='single-message-inner-div-client'>
                    {message}
                </div>
            }

            {
                user==='server' &&
                <div className='single-message-inner-div-server'>
                    {message}
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