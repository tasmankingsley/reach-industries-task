function Video(props) {
    const { deviceResource, videoRef, videoTime, setPlaying, interval } = props;

    function play() {
        setPlaying(true);
    }

    function pause() {
        setPlaying(false);
        clearInterval(interval);
    }

    return (
        <div className='video-div'>
            <video src={deviceResource.videofiles} ref={videoRef} onPlay={play} onPause={pause} controls width="100%" height="auto"></video>
            <div className='gradient'>
                <div className='line' style={{left: `${10 + (videoTime * (778/1289))}px`}}></div>
            </div>
        </div>
    )
}

export default Video