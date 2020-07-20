import React from 'react';

import { Emojione } from 'react-emoji-render';

const UserJoinedOrLeft = ({user, joined, left, locationData}) => {
    let { region, country_name, emoji_flag } = locationData;

    return (
        <div className='user-joined-or-left'>
        {
            joined &&
            <div>
                {user}
                <span className='joined-chat'> joined 
                        <Emojione text={emoji_flag}/>
                </span>
                <div style={{fontSize: '0.8em'}}>
                    {region}, {country_name}
                </div>

            </div>
        }
        {
            left &&
            <div>
                {user}
                <span className='left-chat'> left</span>
            </div>
        }
        </div>
    );
}


export {
    UserJoinedOrLeft as default
}

