import React, {createRef} from 'react';

import './MaterialP2P.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";

import CustomCard from './custom-stream-card/CustomCard';
import Grid from "@material-ui/core/Grid";

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';


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
    constructor(props) {
        super(props);
        this.state = {}
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
            // console.log(stream.id)

            if (!myStream) {
                myStream = {
                    srcObject: stream
                }
            }

            this.setState({
                myStream,
                streamList: [
                    {
                        stream: myStream,
                        placeholder: '/media/Zizou.mp4',
                        muted: true
                    }
                ]
            });
        });
    }

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

                        <Grid container spacing={2} style={{flexDirection: 'row-reverse'}} className='someone-is-calling-grid'>
                            <Grid item>
                                <CustomCard
                                    className='someone-is-calling-card'
                                    stream={this.state.myStream}
                                    showSnackBar={this.showSnackBar}
                                    muted={false}
                                />
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

