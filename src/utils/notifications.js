import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

const isAndroid = Platform.OS === 'android';

const requestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('requestNotificationPermission-status:', authStatus);
    let token = await getFCMToken();
    return token;
  }
};

const getFCMToken = async () => {
  // Register the device with FCM
  if (isAndroid) {
    await messaging().registerDeviceForRemoteMessages();
  }
  // Get the token
  const token = await messaging().getToken();
  messaging()
    .subscribeToTopic('MunchezeClient')
    .then(() => console.log('Subscribed to topic!'));
  PushNotification.createChannel(
    {
      channelId: 'MunchezeClient', // (required)
      channelName: 'MunchezeClient', // (required)
      channelDescription: 'MunchezeClient', // (optional) default: undefined.
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  return token;
};

export {requestNotificationPermission};
