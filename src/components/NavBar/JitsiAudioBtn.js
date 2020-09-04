import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import * as jitsiFuncs from '../../utils/jitsi';

export default function JitsiAudioBtn() {
  const [muted, setMuted] = useState(true);
  const toggelAudio = () => {
    if (muted) {
      jitsiFuncs.unmute();
    } else {
      jitsiFuncs.mute();
    }
    setMuted(!muted);
  };
  return (
    <Button
      onClick={toggelAudio}
      style={{ padding: '5px' }}
      icon={muted ? 'microphone slash' : 'microphone'}
    />
  );
}
