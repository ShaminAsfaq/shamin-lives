import React from 'react';
import Memento from './Memento';
import Redditor from './Redditor';


class Home extends React.Component {

    componentDidMount(){}

    constructor(props) {
        super(props);
        this.state = {}
    }

    render(){
        return (
            <div>
                <h2 style={{paddingTop: '60px'}} className="ui center aligned icon header">
                    <i style={{paddingBottom: '1%', color: 'rgb(0, 117, 238)'}} className="reddit icon"></i>
                    Prominent redditors of Bangladesh
                </h2>
                <div className="ui cards" style={{ justifyContent: 'center', paddingTop: '1%' }}>
                    {
                        // <div>
                        //     <Memento />
                        //     <Memento />
                        //     <Memento />
                        //     <Memento />
                        //     <Memento />
                        // </div>
                    }
                    <Redditor redditor={'shamin_asfaq'}/>
                    <Redditor redditor={'sakib_shahriyar'}/>
                    <Redditor redditor={'pretty_personality'}/>
                </div>
            </div>
        );
    }
}

export {
    Home as default
}
