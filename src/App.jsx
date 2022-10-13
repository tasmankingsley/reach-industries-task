import { useState, useEffect, useRef } from 'react'
import './App.css'
import { frame_data } from './frontend_test.json'

function App() {
  const [deviceIds, setDeviceIds] = useState([]);
  const [deviceRef, setDeviceRef] = useState(useRef(null));
  const [deviceResource, setDeviceResource] = useState([]);
  const [videoRef, setVideoRef] = useState(useRef(null));
  const [interval, setInterval] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // first call
    fetch('https://mockapi.lumi.systems/getdevices?userId=100&orgId=Lumi')
      .then((response) => response.json())
      .then((data) => {
        setDeviceIds(Object.values(data.output));
      })         
      .catch((err) => {
        console.log(err.message);
      });

    // second call
    fetch('https://mockapi.lumi.systems/getdevicedata?deviceId=LabEye-dVr')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.output);
        setDeviceResource(data.output);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // converts currentTime from seconds into frames, and updates the videoTime value when video playing.
    setInterval(window.setInterval(() => {
      let tempTime = Math.floor(videoRef.current.currentTime * 12);

      if (playing === true) {
        setVideoTime(tempTime);
        console.log(tempTime);
      }
    }, 10))

  }, [playing]);

  function play() {
    setPlaying(true);
  }

  function pause() {
    setPlaying(false);
    clearInterval(interval);
  }
  
  return (
    <div className="App">
      
      <div className='devices'>
        <div className='img-div'>
          <img src='https://images.squarespace-cdn.com/content/v1/5da5d63bc3767433e9d17b8f/1571149443276-BDVW2RA2QMXQF3QMTIVA/ReachIndustries_Logo_09302016_white.png?format=1500w' alt='company icon'></img>
        </div>

        <span>Please select a device id:</span>
        
        <select name="deviceIds" ref={deviceRef}>
          {deviceIds.map((device, index) => (
            <option key={index}>{device}</option>
          ))}
        </select>
      </div>

      <div className='video-div'>
        <video src={deviceResource.videofiles} ref={videoRef} onPlay={play} onPause={pause} controls width="100%" height="auto"></video>
        <div className='gradient'>
          <div className='line' style={{left: `${10 + (videoTime * (778/1289))}px`}}></div>
        </div>
      </div>

      <div className='data-div'>
        <span className='avgR'><span className='label'>Avg Red:</span> {frame_data[videoTime].avgR}</span>
        <span className='avgG'><span className='label'>Avg Green:</span> {frame_data[videoTime].avgG}</span>
        <span className='avgB'><span className='label'>Avg Blue:</span> {frame_data[videoTime].avgB}</span>
        <span className='hist'><span className='label'>Histogram ∆:</span> {frame_data[videoTime].histDiff}</span>
        <span className='frame'><span className='label'>Frame:</span> {videoTime}</span>
        <div className='color-div' style={{backgroundColor: `rgb(${frame_data[videoTime].avgR}, ${frame_data[videoTime].avgG}, ${frame_data[videoTime].avgB})`}}></div>
      </div>

    </div>
  )
}

export default App
