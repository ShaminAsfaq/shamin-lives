import React from 'react'

import Peer from 'peerjs';

import '../../styles/components/Conference.css';

class Conference extends React.Component {

    SOCKET_FOR_AUDIO_CALL = '118.179.95.206';
    PORT = 5001

    peer = null;



    onReceiveStream = (stream, element_id) => {
        // Retrieve the video element according to the desired
        var video = document.getElementById(element_id);
        // Set the given stream as the video source 
        video.srcObject = stream;
   
        // console.log('Recieved !')
        // console.log(video.srcObject)

        // Store a global reference of the stream
        window.peer_stream = stream;
    }

    requestLocalVideo = (callbacks) => {
        // Monkeypatch for crossbrowser geusermedia
        // navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;
    
        // Request audio and video
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(callbacks.success).catch(callbacks.error)
    }

    componentDidMount() {
        this.requestLocalVideo({
            success: function(stream){
                console.log('SUCCESs')
                // window.localStream = stream;
                // console.log(stream)
                

                // this.onReceiveStream(stream, 'my-camera');

                // Retrieve the video element according to the desired
                var video = document.getElementById('my-camera');
                // Set the given stream as the video source 
                video.srcObject = stream;
                // console.log(stream)
            
                // Store a global reference of the stream
                window.peer_stream = stream;
                // video.play()
            
            },
            error: function(err){
                alert("Cannot get access to your camera and video !");
                console.error(err);
            }
        });


        this.peer = new Peer(this.state.from, {
            host: this.SOCKET_FOR_AUDIO_CALL, port: this.PORT, path: '/peerjs',
            config: {'iceServers': [
                        { url: 'stun:stun1.l.google.com:19302' },
                        { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
                    ]}
            });

        this.peer.on('open', function(id){
            console.log('My peer ID is: ' + id);

            this.state = {peer_id: id}

        });

        // peer.on('call', this.onReceiveCall);

        this.peer.on('call', (stream) => {
            window.peer_stream = stream;
            this.onReceiveStream(stream, 'peer-camera');
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            from: '',
            to: ''
        };
        // this.onReceiveStream = this.onReceiveStream.bind(this);
        // this.requestLocalVideo = this.requestLocalVideo.bind(this);
    }

    onClick = () => {
         
        let inp = document.getElementsByClassName('input-field-to')
        let inputTo = inp[0].value

        inp = document.getElementsByClassName('input-field-from')
        let inputFrom = inp[0].value

        // this.setState(() => {
        //     return{
        //         input
        //     }
        // })
        console.log(inputFrom)

        this.peer = new Peer(inputFrom, {
            host: this.SOCKET_FOR_AUDIO_CALL, port: this.PORT, path: '/peerjs',
            config: {'iceServers': [
                        { url: 'stun:stun1.l.google.com:19302' },
                        { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
                    ]}
            });

        // console.log('starting call...');

        // this.getAudio(
        //     (MediaStream) => {
        //         console.log('now calling ' + input || this.state.to);
        //         var call = peer.call(input || this.state.to, MediaStream);
        //         call.on('stream', this.onReceiveStream);
        //     },
        //     (err) => {
        //         console.log('an error occured while getting the audio');
        //         console.log(err);
        //     }
        // );

        console.log('Calling to ' + inputTo);
        console.log(this.peer);
        console.log(window.localStream)

        var call = this.peer.call(inputTo, window.localStream);

        call.on('stream', (stream) =>{
            window.peer_stream = stream;

            this.onReceiveStream(stream, 'peer-camera');

            // Retrieve the video element according to the desired
            // var video = document.getElementById('peer-camera');
            // Set the given stream as the video source 
            // video.src = window.URL.createObjectURL(stream);
        
            // Store a global reference of the stream
            // window.peer_stream = stream;
        });
    }

    onRecieve = () => {
        this.peer.on('call', function (call) {
            var acceptsCall = window.confirm("Videocall incoming, do you want to accept it ?");
        
            if(acceptsCall){
                // Answer the call with your own video/audio stream
                call.answer(window.localStream);
        
                // Receive data
                call.on('stream', function (stream) {
                    // Store a global reference of the other user stream
                    window.peer_stream = stream;
                    // Display the stream of the other user in the peer-camera video element !
                    this.onReceiveStream(stream, 'peer-camera');
                });
        
                // Handle when the call finishes
                call.on('close', function(){
                    alert("The videocall has finished");
                });
        
                // use call.close() to finish a call
            }else{
                console.log("Call denied !");
            }
        });
    }

    render() {
        return(
            <div className='audio-player'>
                <input
                    className='input-field-to' 
                    placeholder={`TO:`}
                >
                </input>
                <input
                    className='input-field-from' 
                    placeholder={`FROM:`}
                >
                </input>
                <button
                    onClick={this.onClick}
                >
                    Hit me!
                </button>
                <button onClick={this.onRecieve}>
                    Recieve Call
                </button>
                <video id="my-camera"  width="300" height="300" playsInline autoPlay="autoplay" muted={false} className="mx-auto d-block"></video>
                <video id="peer-camera" width="300" height="300" autoPlay="autoplay" className="mx-auto d-block"></video>
                <audio controls></audio>
            </div>
        );
    }
}


export {
    Conference as default
}

