import React from 'react';

import Redditor from './Redditor';
import '../../styles/components/RedditorList.css';

class RedditorList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        
        let redditors = this.props.redditors.map((item) => {
            return (
                <Redditor key={item} redditor={item}/>
            );
        });

        this.setState({
            redditors
        }, () => {
            // console.log(this.state.redditors)
        })

    }

    render() {
        return(
            <div className='ui cards redditor-list'>
                {this.state.redditors }
            </div>
        );
    }
}

export {
    RedditorList as default
}

