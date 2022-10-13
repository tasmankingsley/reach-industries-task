function Header(props) {
    const { deviceRef, deviceIds } = props;
    
    return (
        <div className='header'>
            <div className='img-div'>
                <img src='https://images.squarespace-cdn.com/content/v1/5da5d63bc3767433e9d17b8f/1571149443276-BDVW2RA2QMXQF3QMTIVA/ReachIndustries_Logo_09302016_white.png?format=1500w' alt='company icon'></img>
            </div>

            <span>Please select a device:</span>
            
            <select name="deviceIds" ref={deviceRef}>
                {deviceIds.map((device, index) => (
                <option key={index}>{device}</option>
                ))}
            </select>
        </div>
    )
}

export default Header