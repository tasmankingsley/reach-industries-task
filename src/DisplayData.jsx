function DisplayData(props) {
    const { frame_data, videoTime } = props;

    return (
        <div className='data-div'>
            <span className='frame'><span className='label'>Frame:</span> {videoTime}</span>
            <span className='avgR'><span className='label'>Avg Red:</span> {frame_data[videoTime].avgR}</span>
            <span className='avgG'><span className='label'>Avg Green:</span> {frame_data[videoTime].avgG}</span>
            <span className='avgB'><span className='label'>Avg Blue:</span> {frame_data[videoTime].avgB}</span>
            <span className='hist'><span className='label'>Histogram ∆:</span> {frame_data[videoTime].histDiff}</span> 
            <div className='color-div' style={{backgroundColor: `rgb(${frame_data[videoTime].avgR}, ${frame_data[videoTime].avgG}, ${frame_data[videoTime].avgB})`}}></div>
        </div>
    )
}

export default DisplayData