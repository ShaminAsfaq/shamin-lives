import React from 'react'
import axios from 'axios';

import '../styles/components/Redditor.css';

class Redditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * Answer from: https://stackoverflow.com/a/21748457/5554993
     * 
     * Converted to arrow function
     * 
     * Takes year, month, date in integer, and locale in two digit string such as 'en'
     */
    monthLocalizedString = (year, month, date, locale) => {
        let fullMonth = new Date(year, month).toLocaleString(locale,{month:"long"});
        return `${fullMonth} ${date}, ${year}`;
    };

    /**
     * Answer from: https://stackoverflow.com/a/2901298/5554993
     * 
     * Takes an input number and converts it into comma separated number for better understanding
     */
    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    

    componentDidMount() {
        axios.get(`https://www.reddit.com/user/${this.props.redditor}/about.json`)
            .then((response) => {
                let { 
                    icon_img,
                    link_karma,
                    comment_karma,
                    awarder_karma,
                    awardee_karma,
                    created,
                    subreddit
                } = response.data.data;
                created = created * 1000;
                let joined = new Date(created);
                joined = this.monthLocalizedString(joined.getFullYear(), joined.getMonth(), joined.getDate(), 'en');
                icon_img = icon_img.split('?')[0];

                this.setState({
                    icon_img, 
                    display_name_prefixed: subreddit.display_name_prefixed,
                    karma: this.numberWithCommas(link_karma + comment_karma + awarder_karma + awardee_karma),
                    created, 
                    description: subreddit.public_description,
                    title: subreddit.title,
                    joined
                })
            })
    }

    render(){
        return(
            <div className="card single-redditor">
                <div className="image">
                    <img className='redditor-dp' src={this.state.icon_img}/>
                </div>
                    <div className="content">
                        <div className="header">
                            {this.state.display_name_prefixed}

                            <a href={`https://reddit.com/${this.state.display_name_prefixed}`} target='_blank' className="ui image label on-reddit-link">
                                on reddit
                            </a>
                        </div>
                        <div className="meta">
                            <a>{this.state.title}</a>
                        </div>
                        <div className="description">
                            <i className="quote left icon"></i>
                            { this.state.description }
                        </div>
                    </div>
                <div className="extra content">
                    <span className="right floated">
                        <i className="birthday cake icon cake-day-icon"></i>
                        {this.state.joined}
                    </span>
                    <span>
                        <i className="certificate icon karma-icon"></i>
                        {this.state.karma}
                    </span>
                </div>
          </div>
        );
    };
}

export {
    Redditor as default
}