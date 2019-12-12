/**
 * Complete Proto-Type. Need more time. Nothing is fixed here.
 * I want to show the currently playing song on my Spotify to the viewers of the Blog.
 */
import React from 'react';
import axios from 'axios';

import analyze from 'rgbaster';
import prettyMilliseconds from 'pretty-ms';

import '../styles/Spotify.css';

class Spotify extends React.Component {
    baseURL = 'https://shamin-lives-server.herokuapp.com';
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.timerID = setInterval(() => {
            axios({
                method: 'GET',
                url: `${this.baseURL}/get_current_song`
            }).then(async (response) => {
                // console.log(response)
                // console.log(this.state.response.data.item.album.images)
                if(response.data === "") {
                    response = undefined
                }
                this.setState(() => {
                    return {
                        response
                    }
                });

                if(
                    this.state.response &&
                    this.state.response.data &&
                    this.state.response.data.item &&
                    this.state.response.data.item.album &&
                    this.state.response.data.item.album.images[1] &&
                    this.state.response.data.item.album.images[1].url
                ) {

                    const result = await analyze(`${this.state.response.data.item.album.images[1].url}`)
                    this.setState(() => {
                        return {
                            dominant: result[0].color
                        }
                    });
                    // var found = JSON.stringify(result[0].color);
                    // found = found.substr(1,found.length-2);
                    // console.log(found)
                    // console.log(found.substr(0, found.length-1) + ',0)' + found.substr(found.length+1));

                    var found = JSON.stringify(result[0].color);
                    found = found.substr(1,found.length-2);
                    
                    var lowerGradiant = found.substr(0, found.length-1) + ',0)' + found.substr(found.length+1);
                    var upperGradiant = found.substr(0, found.length-1) + ',1)' + found.substr(found.length+1);

                    this.setState(() => {
                        return {
                            dominant: result[0].color,
                            lowerGradiant: lowerGradiant,
                            upperGradiant: upperGradiant
                        }
                    });

                    // console.log(this.state.lowerGradiant)
                    // console.log(this.state.upperGradiant)
                }
            });
        }, 1000)
    }

    render() {
        return (
            <div>
                {
                    this.state.response &&
                    this.state.response.data &&
                    this.state.response.data.progress_ms &&
                    this.state.response.data.item &&
                    this.state.response.data.item.duration_ms &&
                    this.state.response.data.item.name &&
                    this.state.response.data.item.artists[0] &&
                    this.state.response.data.item.artists[0].name &&
                    this.state.response.data.item.album &&
                    this.state.response.data.item.album.images[1] &&
                    this.state.response.data.item.album.images[1].url ?
                    <div className="ui card spotify-card" style={{
                            position: 'fixed',
                            bottom: '1.5rem',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            marginLeft: '2rem',
                            boxShadow: '6px 6px 10px #50394c'
                    }}>
                        <div 
                            className="content" 
                            style={{
                                    background: `linear-gradient(${this.state.lowerGradiant},${this.state.upperGradiant}), url(${this.state.response.data.item.album.images[1].url})`,
                                    backgroundSize: 'inherit',
                                    backgroundPosition: 'top',
                                    height: '100px',
                                    paddingLeft: '0',
                                    paddingRight: 0,
                            }}
                        >
                            <div className="center aligned header" style={{ paddingTop: '5%' }}>
                                <h1 className="ui header" style={{ fontSize: '40px', color: `${this.state.dominant}`, filter: 'invert(100%)' }}>
                                    { prettyMilliseconds(this.state.response.data.progress_ms, {secondsDecimalDigits: 0, colonNotation: true}) } 
                                    / 
                                    { prettyMilliseconds(this.state.response.data.item.duration_ms, {secondsDecimalDigits: 0, colonNotation: true}) }
                                </h1>
                            </div>
                            <div className="center aligned header" style={{ paddingTop: '3%' }}>
                                <h2 className="ui header" style={{ fontSize: '20px', color: `${this.state.dominant}`, filter: 'invert(100%)' }}>
                                    { 
                                        this.state.response.data.item.name.length > 25 ? 
                                        this.state.response.data.item.name.substr(0, 25) :
                                        this.state.response.data.item.name
                                    }
                                </h2>
                            </div>
                            <div className="center aligned meta">
                                <h5 className="ui header" style={{ fontSize: '13px', color: `${this.state.dominant}`, filter: 'invert(100%)', opacity: '0.5' }}>
                                    { this.state.response.data.item.artists[0].name }
                                </h5>
                            </div>
                        </div>
                        <div className="extra content spotify-card-div-bottom" id="spotify-card-div-bottom" style={{ backgroundColor: `${this.state.dominant}` }}>
                            {
                                this.state.response.data.is_playing === true ?   
                                <div className="center aligned author" style={{ color: `${this.state.dominant}`, filter: 'invert(100%)' }}>
                                    Now playing on Spotify&nbsp;
                                    <i className="spotify icon"></i>
                                </div> :
                                <div className="center aligned author" style={{ color: `${this.state.dominant}`, filter: 'invert(100%)', fontWeight: 'bold' }}>
                                    Paused&nbsp;
                                    <i className="spotify icon"></i>
                                </div>
                            }
                        </div>
                    </div> : <div/>
                }
            </div>
        )
    }
}

export {
    Spotify as default
}


