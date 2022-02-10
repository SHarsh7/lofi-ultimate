import React, { useState } from "react"
import { FiVolume1,FiVolume2,FiVolumeX } from 'react-icons/fi';

function VolumeBar() {
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)

  return (
      <section>
        <input
          type="range"
          min={0}
          max={100}
          step={2}
          value={volume}
          onChange={event => {
            setVolume(event.target.valueAsNumber)
          }}
        />
        <button onClick={() => setMuted(m => !m)}>
          {muted ? <FiVolumeX/> : (volume>40 ? <FiVolume2/>: <FiVolume1/>)}
        
        </button>
      </section>
      
  )
}

export default VolumeBar;