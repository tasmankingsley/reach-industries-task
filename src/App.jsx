import './App.css'
import { useState, useEffect, useRef } from 'react'
import { frame_data } from './frontend_test.json'
import Header from './Header'
import Video from './Video'
import DisplayData from './DisplayData'


function App() {
  const deviceRef = useRef(null);
  const videoRef = useRef(null);
  const [deviceIds, setDeviceIds] = useState([]);
  const [deviceResource, setDeviceResource] = useState([]);
  const [videoTime, setVideoTime] = useState(0);
  const [interval, setInterval] = useState(0);
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


  return (
    <div className="App">

      <Header deviceRef={deviceRef} deviceIds={deviceIds}/>

      <Video videoTime={videoTime} videoRef={videoRef} deviceResource={deviceResource} setPlaying={setPlaying} interval={interval} />

      <DisplayData videoTime={videoTime} frame_data={frame_data}/>

    </div>
  )
}

export default App
