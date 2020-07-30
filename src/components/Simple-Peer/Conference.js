import React from 'react'

import io from 'socket.io-client';
import Peer from 'simple-peer';

import {v4 as uuidV4} from 'uuid';

import '../../styles/components/Conference.css';

class Conference extends React.Component {

    // SOCKET_URL = 'http://118.179.95.206:5000';
    SOCKET_URL = 'https://shamin-lives-server.herokuapp.com';
    socket = io.connect(this.SOCKET_URL, {'transports': ['websocket', 'polling']});


    /*
    * Partial Answer: Taken from https://stackoverflow.com/a/11646945/5554993
    */
    // stop both mic and camera
    stopBothVideoAndAudio = (stream) => {
        stream.getTracks().forEach((track) => {
            if (track.readyState == 'live') {
                track.stop();
            }
        });
    };

    componentDidMount() {

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream) => {
            let userVideo = this.state.userVideo
            // console.log(stream.id)

            if (!userVideo) {
                userVideo = {
                    srcObject: stream
                }
            }

            this.setState({
                stream,
                userVideo
            }, () => {
                // console.log(this.state.userVideo)
                let video = document.getElementById('my-camera');
                video.srcObject = this.state.userVideo.srcObject;
            })
        });

        this.socket.on('connection', res => {
            console.log('FOUND RESPONSE');
        });

        this.socket.on('yourID', id => {
            // console.log('My ID: ' + id)
            this.setState({
                yourID: id
            })
        });

        this.socket.on('allUsers', users => {
            this.setState({
                users
            })
        });

        this.socket.on('hey', data => {
            console.log('HEY FOUND')
            this.setState({
                receivingCall: true,
                caller: data.from,
                callerSignal: data.signal
            }, () => {
                console.log(this.state.receivingCall)
                console.log(this.state.caller)
                console.log(this.state.callerSignal)
            })
        });

    }

    componentWillUnmount() {
        // console.log('Stopping things')
        this.stopBothVideoAndAudio(this.state.userVideo.srcObject);
        // console.log(window.localStream)
        this.socket.emit('left-video', this.state.yourID);
    }

    constructor(props) {
        super(props);
        this.state = {
            from: '',
            to: '',
            addNewVideo: this.addNewVideo
        };
        // this.onReceiveStream = this.onReceiveStream.bind(this);
        // this.requestLocalVideo = this.requestLocalVideo.bind(this);
    }

    addNewVideo = (video, stream) => {
        // console.log(stream)
        let grid = document.getElementById('video-grid');
        // console.log(grid)
        // console.log(video)
        // console.log(stream)

        video.srcObject = stream;

        video.addEventListener('loadedmetadata', () => {
            video.play();
        });

        grid.append(video);

    };

    acceptCall = () => {
        console.log('Accept Call');

        this.setState({
            callAccepted: true
        })

        const peer = new Peer({
            initiator: false,
            trickle: false,
            debug: true,
            stream: this.state.userVideo.srcObject
        });

        peer.on('signal', data => {
            console.log('DEBUG 1')
            console.log(data)
            this.socket.emit('acceptCall', {signal: data, to: this.state.caller})
        })

        peer.on('stream', stream => {
            console.log('DEBUG 2')
            this.setState({
                partnerVideo: {
                    ...this.state.partnerVideo,
                    srcObject: stream
                }
            }, () => {
                console.log(this.state.partnerVideo.srcObject.id)
                let video = document.getElementById('partner-camera');
                video.srcObject = this.state.partnerVideo.srcObject;
            })
        })
        console.log('Caller Signal: ')
        peer.signal(this.state.callerSignal)
    }

    callPeer = (id) => {
        // console.log(`Calling ${id}`);
        const peer = new Peer({
            initiator: true,
            trickle: false,
            // config: {
            //     iceServers: [
            //         {
            //             urls: "stun:numb.viagenie.ca",
            //             username: "sultan1640@gmail.com",
            //             credential: "98376683"
            //         },
            //         {
            //             urls: "turn:numb.viagenie.ca",
            //             username: "sultan1640@gmail.com",
            //             credential: "98376683"
            //         }
            //     ]
            // },
            stream: this.state.userVideo.srcObject
        })

        peer.on('signal', data => {
            console.log('Signal from Caller')
            console.log(this.state.userVideo.srcObject.id)
            this.socket.emit('callUser', {userToCall: id, signalData: data, from: this.state.yourID});
        })

        peer.on('stream', stream => {
            // console.log(stream)
            if (!this.state.partnerVideo) {
                this.setState({
                    partnerVideo: {
                        ...this.state.partnerVideo,
                        srcObject: stream
                    }
                })
                console.log('FOUND PARTNER VIDEO')
                let video = document.getElementById('partner-camera');
                video.srcObject = this.state.partnerVideo.srcObject;
                // console.log(this.state.userVideo)
                // console.log(this.state.partnerVideo)
            }
        })

        this.socket.on('callAccepted', signal => {
            console.log('Call Accepted')
            this.setState({
                callAccepted: true
            })
            peer.signal(signal);
        })
    };

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className='all-videos' id='video-grid'>

                    <video
                        controls
                        style={{outline: '3px solid black'}}
                        id="my-camera"
                        width="300" height="300"
                        playsInline autoPlay="autoplay"
                        muted={true}
                        className="mx-auto d-block"/>

                    {
                        this.state.partnerVideo &&
                        <video
                            controls
                            style={{outline: '3px solid black', marginLeft: '2%'}}
                            id="partner-camera"
                            width="300" height="300"
                            playsInline autoPlay="autoplay"
                            muted={false}
                            className="mx-auto d-block"/>
                    }


                </div>
                <div>
                    {
                        this.state.users &&
                        Object.entries(this.state.users).map((item, idx) => {
                            if (item[0] !== this.state.yourID) {
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            this.callPeer(item)
                                        }}
                                    >
                                        Call {item}
                                    </button>
                                )
                            }
                        })
                    }
                </div>
                <div>
                    {
                        this.state.receivingCall &&
                        !this.state.callAccepted &&
                        <div>
                            Sir, you have a call
                            <button onClick={this.acceptCall}>
                                Accept
                            </button>
                            <button onClick={() => {
                                this.setState({
                                    receivingCall: undefined
                                })
                            }}>
                                Decline
                            </button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}


export {
    Conference as default
}

