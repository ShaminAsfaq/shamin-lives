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

import {makeStyles} from "@material-ui/core/styles";
import './CustomCard.css';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
    },
});

const CustomCard = (props) => {
    const classes = useStyles();
    const {showSnackBar, placeholder, stream, muted} = props;

    // console.log(props.stream)

    const [isRunningStream, setIsRunningStream] = useState(true);
    const [streamRef, setStreamRef] = useState(useRef());

    /*
* Partial Answer: Taken from https://stackoverflow.com/a/11646945/5554993
*/
    // stop both mic and camera
    const stopBothVideoAndAudio = (stream) => {
        stream.getTracks().forEach((track) => {
            if (track.readyState == 'live') {
                track.stop();
            }
        });
    };

    useEffect(() => {
        if (stream) {
            streamRef.current.srcObject = stream;
        }
        console.log(stream)

        return (() => {
            if (stream) {
                stopBothVideoAndAudio(stream);
            }
        });
    }, [stream]);

    return (
        <Card className={classes.root} className='main-card'>
            <CardActionArea className='video-card'>
                {
                    muted ?
                        <MicOffIcon style={{position: 'absolute', left: '3%', top: '3%', color: 'red'}}/>
                        :
                        <MicIcon style={{position: 'absolute', left: '3%', top: '3%', color: 'blue'}}/>
                }
                <CardMedia
                    ref={streamRef}
                    component='video'
                    className={classes.media}
                    // controls
                    playsInline
                    autoPlay
                    loop
                    muted={muted}
                    className='video-content'
                />

            </CardActionArea>
            <CardActions className='card-actions'>
                <ButtonGroup variant="contained" color="primary"
                             aria-label="contained primary button group"
                >
                    <Button
                        size="small" color="primary"
                        onClick={showSnackBar}
                    >
                        <ShareIcon/>
                    </Button>
                    {
                        isRunningStream &&
                        <Button
                            size="small" color="primary"
                            onClick={() => {
                                streamRef.current.pause();
                                setIsRunningStream(false);
                            }}
                        >
                            <PauseIcon/>
                        </Button>
                    }
                    {
                        !isRunningStream &&
                        <Button
                            size="small" color="primary"
                            onClick={() => {
                                streamRef.current.play();
                                setIsRunningStream(true);
                            }}
                        >
                            <PlayArrowIcon/>
                        </Button>
                    }
                    <Button
                        size="small" color="primary"
                        onClick={() => {
                            if (streamRef.current.requestFullscreen) {
                                streamRef.current.requestFullscreen();
                            } else if (streamRef.current.mozRequestFullScreen) { /* Firefox*/
                                streamRef.current.mozRequestFullScreen();
                            } else if (streamRef.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera*/
                                streamRef.current.webkitRequestFullscreen();
                            } else if (streamRef.current.msRequestFullscreen) { /* IE/Edge*/
                                streamRef.current.msRequestFullscreen();
                            }
                        }}
                    >
                        <FullscreenIcon/>
                    </Button>
                </ButtonGroup>
            </CardActions>
        </Card>
    );
};

export {
    CustomCard as default
}