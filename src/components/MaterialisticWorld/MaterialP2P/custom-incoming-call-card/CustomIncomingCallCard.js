import React, {useRef, useState, useEffect} from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ShareIcon from '@material-ui/icons/Share';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';

import PersonIcon from '@material-ui/icons/Person';

import CallIcon from '@material-ui/icons/Call';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';

import {makeStyles} from "@material-ui/core/styles";

import './CustomIncomingCallCard.css';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});
const CustomIncomingCallCard = (props) => {
    const classes = useStyles();
    const { acceptCall, declineCall, callFrom } = props;

    return (
        <Card className={classes.root} className='main-card-answer'>
            <CardActionArea className='image-card'>
                <CardMedia
                    className={classes.media}
                    className='image-content'
                    component='img'
                    image='/media/video.png'
                    title="Contemplative Reptile"
                />
            </CardActionArea>
            <CardActions className='action-group'>
                <ButtonGroup variant="contained" color="primary"
                             aria-label="contained primary button group"
                >
                    <Button
                        size="small" color="primary" variant='contained'
                        onClick={acceptCall}
                    >
                        <VideocamIcon/>
                    </Button>
                    <Button
                        size="small" color="secondary" variant='contained'
                        onClick={declineCall}
                    >
                        <VideocamOffIcon/>
                    </Button>

                </ButtonGroup>
                <div className='incoming-call-overlay'>{callFrom}</div>
            </CardActions>
        </Card>
    );
};

export {
    CustomIncomingCallCard as default
}


