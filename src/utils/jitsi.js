/* global JitsiMeetExternalAPI */
import './external_api';

let api;

export const initJitsi = (config) => {
  try {
    if (api) {
      destroy();
    }
    const jitsiCofgi = {
      roomName: 'rastaihasdfj1alskfja2341skdfj',
      parentNode: document.querySelector('#jit-si-meet'),
      width: '100%',
      height: '100vh',
      configOverwrite: {
        disableDeepLinking: true,
        prejoinPageEnabled: false,
        startAudioOnly: false,
        startWithAudioMuted: true,
        startWithVideoMuted: true,
      },
      interfaceConfigOverwrite: {
        SHOW_CHROME_EXTENSION_BANNER: false,
        RECENT_LIST_ENABLED: false,
        VIDEO_QUALITY_LABEL_DISABLED: true,
        CONNECTION_INDICATOR_DISABLED: true,
        TOOLBAR_ALWAYS_VISIBLE: true,
        DEFAULT_BACKGROUND: '#eaeaea',
        LANG_DETECTION: false,
        HIDE_INVITE_MORE_HEADER: true,
        DISPLAY_WELCOME_PAGE_CONTENT: false,
        GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
        SHOW_JITSI_WATERMARK: false,
        APP_NAME: 'Rasta Meet',
        NATIVE_APP_NAME: 'Rasta Meet',
        MOBILE_APP_PROMO: false,
        PROVIDER_NAME: 'Rasta',
        TOOLBAR_BUTTONS: [
          'camera',
          'closedcaptions',
          'desktop',
          'fullscreen',
          'fodeviceselection',
          'chat',
          'etherpad',
          'videoquality',
          'tileview',
        ],
      },
    };
    api = new JitsiMeetExternalAPI('meet.jit.si/r/', {
      ...jitsiCofgi,
      ...config,
    });
  } catch (err) {
    console.log(err);
  }
};

export const messageListener = (onMessage) => {
  try {
    api.addEventListeners({
      endpointTextMessageReceived: (object) =>
        onMessage(JSON.parse(object.data.eventData.text)),
    });
  } catch (err) {
    console.log(err);
    initJitsi({ width: 0, height: 0 });
  }
};

export const sendGroupMessage = (message) => {
  try {
    Object.keys(api._participants).forEach((participant) =>
      api.executeCommand('sendEndpointTextMessage', participant, message)
    );
  } catch (err) {
    console.log(err);
    initJitsi({ width: 0, height: 0 });
  }
};

export const destroy = () => {
  try {
    api.removeEventListener('endpointTextMessageReceived');
    api.dispose();
    api = null;
  } catch (err) {
    console.log(err);
  }
};

export const unmute = () => {
  try {
    api.isAudioMuted().then((muted) => {
      if (muted) {
        api.executeCommand('toggleAudio');
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const mute = () => {
  try {
    api.isAudioMuted().then((muted) => {
      if (!muted) {
        api.executeCommand('toggleAudio');
      }
    });
  } catch (err) {
    console.log(err);
  }
};
