import React, {createRef} from 'react';
import './MaterialP2P.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
import CustomCard from './custom-stream-card/CustomCard';
import Grid from "@material-ui/core/Grid";
import CustomIncomingCallCard from './custom-incoming-call-card/CustomIncomingCallCard';

import io from "socket.io-client";
import Peer from 'simple-peer';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import VideocamIcon from '@material-ui/icons/Videocam';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = theme => ({
    root: {
        maxWidth: 345
    },
    media: {
        height: 315,
        objectFit: 'scale-down'
    },
});

class MaterialP2P extends React.Component {
    // SOCKET_URL = 'http://118.179.95.206:5000';
    // SOCKET_URL = 'https://shamin-lives-server.herokuapp.com';
    // SOCKET_URL = 'http://localhost:5000';
    SOCKET_URL = 'https://shamin-lives-server.onrender.com';    //  Heroku is discontinued. Now deployed on RENDER
    socket = io.connect(this.SOCKET_URL, {'transports': ['websocket', 'polling']});

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: -1
        }
    }

    Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream) => {
            let myStream = this.state.myStream;
            if (!myStream) {
                myStream = {
                    srcObject: stream
                }
            }

            this.setState({
                myStream,
                streamList: [
                    {
                        stream: myStream.srcObject,
                        placeholder: '/media/Zizou.mp4',
                        muted: true
                    }
                ]
            }, () => {
                // console.log('State Updated')
                this.socket.emit('new-video-streamer');
            });
        });

        this.socket.on('connection', res => {
            console.log(res)
        });

        this.socket.on('yourID', id => {
            this.setState({
                yourID: id
            });
        });

        this.socket.on('yourUsername', username => {
            // console.log(username);
            this.setState({
                username
            });
        });

        this.socket.on('allVideoUsers', users => {
            // console.log(users);
            this.setState({
                users
            });
        });

        this.socket.on('hey', data => {
            this.setState({
                receivingCall: true,
                caller: data.from,
                callerSignal: data.signal
            });
        });

        this.socket.on('callDeclined', data => {
            this.setState({
                selectedItem: -1
            });
        });

    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    declineCall = () => {
        this.setState({
            receivingCall: undefined,
            selectedItem: -1
            // caller: undefined
        }, () => {
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: this.state.myStream.srcObject
            });

            this.socket.emit('declineCall', {to: this.state.caller, from: this.state.yourID});
        });
    };

    acceptCall = () => {
        this.setState({
            callAccepted: true
        });

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: this.state.myStream.srcObject
        });

        peer.on('signal', data => {
            this.socket.emit('acceptCall', {
                signal: data,
                to: this.state.caller
            });
        });

        peer.on('stream', stream => {
            let oldList = this.state.streamList;
            let newEntry = {
                stream,
                placeholder: '/media/Zizou.mp4',
                muted: false,
                otherPersonId: this.state.caller
            };
            oldList.push(newEntry);

            this.setState({
                partnerVideo: {
                    ...this.state.partnerVideo,
                    srcObject: stream,
                    streamList: oldList
                }
            }, () => {

            });
        });

        peer.signal(this.state.callerSignal);
    };

    callPeer = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            config: {
                iceServers: [
                    {urls: 'stun:stun.l.google.com:19302'},
                    {
                        url: 'turn:numb.viagenie.ca',
                        credential: 'new-discord',
                        username: 'shamin.asfaq@gmail.com',
                    },
                ]
            },
            stream: this.state.myStream.srcObject
        });

        peer.on('signal', data => {
            this.socket.emit('callUser', {userToCall: id, signalData: data, from: this.state.yourID});
        });

        peer.on('stream', stream => {
            if (!this.state.partnerVideo) {
                let oldList = this.state.streamList;
                let newEntry = {
                    stream,
                    placeholder: '/media/Zizou.mp4',
                    muted: false
                };
                oldList.push(newEntry);

                this.setState({
                    partnerVideo: {
                        ...this.state.partnerVideo,
                        srcObject: stream,
                        streamList: oldList
                    }
                });
            }
        });

        this.socket.on('callAccepted', signal => {
            this.setState({
                callAccepted: true
            });
            peer.signal(signal);
        });
    };

    showSnackBar = () => {
        this.setState({
            snackBarOpen: true
        })
    };

    closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            snackBarOpen: false
        })
    };

    getUserNameForCurrentStream = (each) => {
        // console.log(each);
        if (each.otherPersonId) {
            return this.state.users[each.otherPersonId];
        }

        if (each.stream.id === this.state.myStream.srcObject.id) {
            return this.state.username;
        }

        const selectedItemFromUserList = this.state.selectedItem;
        if (selectedItemFromUserList !== -1) {
            return Object.values(this.state.users)[selectedItemFromUserList];
        } else {
            return 'UnKnown User';
        }
    }

    streamList = [];

    render() {
        // console.log(this.state);
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                <Container maxWidth="sm" className='main-container'>
                    <Snackbar
                        open={this.state.snackBarOpen}
                        autoHideDuration={3000}
                        onClose={this.closeSnackBar}
                        className='share-snack-bar'
                    >
                        <this.Alert severity="error">
                            Sharing is not available, yet.
                        </this.Alert>
                    </Snackbar>

                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
                        <Grid container spacing={2} className='video-grid'>
                            {
                                this.state.streamList &&
                                this.state.streamList.map((each, idx) => {
                                    return (
                                        <Grid item key={idx}>
                                            <CustomCard
                                                username={this.getUserNameForCurrentStream(each)}
                                                stream={each.stream}
                                                placeholder={each.placeholder}
                                                showSnackBar={this.showSnackBar}
                                                muted={each.muted}
                                            />
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>

                        <Grid container spacing={2}
                              style={{flexDirection: 'row-reverse', justifyContent: 'space-between'}}
                              className='someone-is-calling-grid'>
                            <Grid item>
                                <List
                                    style={{cursor: 'pointer'}}
                                    subheader={
                                        <ListSubheader>
                                            Available Peers (Click to call)
                                        </ListSubheader>
                                    }
                                    className={classes.root}
                                >
                                    {
                                        this.state.users &&
                                        Object.entries(this.state.users).map((item, idx) => {
                                            // console.log(this.state.caller)
                                            // console.log(item[0])
                                            if (item[0] !== this.state.yourID) {
                                                return (
                                                    <ListItem disabled={this.state.selectedItem === idx} key={idx}
                                                              button onClick={() => {
                                                        this.callPeer(item);
                                                        this.setState({
                                                            selectedItem: idx
                                                        })
                                                    }}>
                                                        <ListItemIcon>
                                                            <VideocamIcon/>
                                                        </ListItemIcon>
                                                        <ListItemText id="switch-list-label-wifi" primary={item[1]}/>
                                                    </ListItem>
                                                );
                                            }
                                        })
                                    }
                                </List>
                            </Grid>

                            <Grid item>
                                {
                                    this.state.receivingCall &&
                                    !this.state.callAccepted &&
                                    <CustomIncomingCallCard acceptCall={this.acceptCall}
                                                            declineCall={this.declineCall}
                                                            callFrom={this.state.users[this.state.caller]}
                                    />
                                }
                            </Grid>
                        </Grid>
                    </div>
                </Container>
                <div style={{ padding: '2%', fontSize: 'medium'}}>
                    Instructions:
                    <ul>
                        <li>Open this page in two different browsers tabs.</li>
                        <li>Under "Available Peers" on the right side of the page, you will then see the name of other available peer.</li>
                        <li>Click on the name and keep your eyes on the second tab. Wait a few seconds.</li>
                        <li>Accept or Decline the call from the incoming call options.</li>
                        <li><strong>Please Note:</strong> <span style={{color: 'red', fontWeight: 'bold'}}><i>This is a free deployment. Sometimes it takes a few minutes for the socket server to run first.</i></span></li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

MaterialP2P.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(MaterialP2P);

