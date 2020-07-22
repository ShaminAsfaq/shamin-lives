import React from 'react';
import Redditor from './Redditor';

import axios from 'axios';

import '../../styles/components/SearchRedditor.css';

class SearchRedditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redditor: ''
        };
        this.inputRef = React.createRef();
    }

    searchRedditor = () => {

        this.setState({
            found: false
        }, () => {
            axios.get(`https://www.reddit.com/user/${this.inputRef.current.value}/about.json`)
            .then((response) => {
                console.log(response.data.data)
                let user = response.data.data.name;
                this.setState({
                    found: true,
                    redditor: this.inputRef.current.value
                }, () => {
                    console.log(this.state)
                })
            }).catch(e => {
                console.log('FAILED TO GET REDDITOR')
                this.setState({
                    found: false,
                    redditor: ''
                })
            })
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
        return(
            <div className='search-redditor'>
                <div className="ui input search-redditor-input">
                    <input 
                        autoFocus
                        onKeyUp={this.debounce(this.searchRedditor, 300)}
                        type="text" placeholder="u/Search redditor"
                        ref={this.inputRef}
                    />
                    {
                        this.state.found===true &&
                        <div className='found-redditor'>
                            <Redditor redditor={this.state.redditor}/>
                        </div>
                    }
                    {
                        this.state.found===false &&
                        <div style={{color: 'red'}}>
                            No redditor found
                        </div>
                    }
                </div>
            </div>
        );
    }
}


export {
    SearchRedditor as default
}


