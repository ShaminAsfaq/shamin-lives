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
    SOCKET_URL = 'https://shamin-lives-server.herokuapp.com';
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
            });
        });

        this.socket.on('connection', res => {
        });

        this.socket.on('yourID', id => {
            this.setState({
                yourID: id
            });
        });

        this.socket.on('allUsers', users => {
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
            receivingCall: undefined
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
                muted: false
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

    streamList = [];

    render() {
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

                        <Grid container spacing={2} style={{flexDirection: 'row-reverse'}}
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
                                                        <ListItemText id="switch-list-label-wifi" primary={item[0]}/>
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
                                                            declineCall={this.declineCall}/>
                                }
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}

MaterialP2P.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(MaterialP2P);

