import React from 'react';
import Redditor from './Redditor';

import '../../styles/components/SearchRedditor.css';

class SearchRedditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.inputRef = React.createRef();
    }

    searchRedditor = () => {
        this.setState({
            value: this.inputRef.current.value
        }, () => {
            console.log(this.state.value)
        })
    }

    /**
     * Answer from: https://stackoverflow.com/a/57763036/5554993
     * 
     * The following two methods send socket server a signal that user has stopped typing.
     * 
     * @param {*} callback 
     * @param {*} wait 
     */
    debounce = (callback, wait) => {
        let timeout;
        return (...args) => {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => callback.apply(context, args), wait);
        };
    }

    render() {
        console.log('Rendered..')
        console.log(this.state)
        return(
            <div className='search-redditor'>
                <h2 className="ui center aligned icon header">
                    Search for any redditor
                </h2>
                <div className="ui input search-redditor-input">
                    <input 
                        onKeyUp={this.debounce(this.searchRedditor, 100)}
                        type="text" placeholder="Search..."
                        ref={this.inputRef}
                    />
                    {
                        this.state.value.length>0 &&
                        <Redditor redditor={this.state.value}/>
                    }
                </div>
            </div>
        );
    }
}


export {
    SearchRedditor as default
}


