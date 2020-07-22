import React from 'react';
import Memento from './Memento';
import RedditorList from './reddit/RedittorList';
import SearchRedditor from './reddit/SearchRedditor';

import '../styles/components/Home.css';

class Home extends React.Component {

    componentDidMount(){}

    constructor(props) {
        super(props);
        this.state = {}
    }

    render(){
        let redditors = [
                            'sakib_shahriyar',
                            'shamin_asfaq',
                            'pretty_personality',
                            'I_droid1'
                        ];

        return (
            <div className='home-parent'>
                <div className='prominent-redditors'>
                    <h2 className="ui center aligned icon header">
                        {/* <i style={{paddingBottom: '1%', color: 'rgb(0, 117, 238)'}} className="reddit icon"></i> */}
                        Prominent redditors of Bangladesh
                    </h2>
                    <RedditorList redditors={redditors}/>
                </div>
                <SearchRedditor/>
            </div>
        );
    }
}

export {
    Home as default
}
