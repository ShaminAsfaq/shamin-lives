import React from 'react';
import moment from 'moment';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment()
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.setState({
                date: moment()
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div className="ui label">
                {
                    this.state.date.format('Do MMM, YYYY')
                }
                <div className="detail">
                {
                    this.state.date.format('hh:mm:ss A')
                }
                </div>
            </div>
        );
    }

}

export {
    Clock as default
}
