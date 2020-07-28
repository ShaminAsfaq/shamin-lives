import React from 'react';
import axios from 'axios';

class Placeholder extends React.Component {


    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let URL = 'https://jsonplaceholder.typicode.com/posts';

        axios.get(URL).then((response) => {
            let body = Object.entries(response)
            this.setState({
                posts: body[0][1]
            })
        });
    }

    render() {
        return(
            <div style={{paddingTop: '60px'}}>
                {
                    this.state.posts && this.state.posts.map((item, i) => {
                        return(
                            <div key={i}>
                                {item.title}
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export {
    Placeholder as default
}


