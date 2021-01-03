function VolumeSlider({volume, handleChange}) {
    return (
        <>
        <label className="thin" for="volume">Volume</label>
        <input type="range" id="video-volume" name="volume" min="0" max="1" step="0.01" value={volume} onChange={handleChange}></input>
        </>
    )

}

export default VolumeSlider;