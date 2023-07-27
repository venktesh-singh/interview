import argonTheme from './Theme';
// import articles from './articles';
import Images from './Images';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import tabs from './tabs';

// const baseUrl = 'http://192.168.0.163:4000/api'; //live link
// const baseUrl = 'http://143.198.53.147:4000/api'; //local link
// const baseUrl = 'http://192.168.29.198:4000/api'; //local link
// const baseUrl = "http://94581ecee2f2.ngrok.io/api";
// const baseUrl = "http://192.168.55.2:3002/api";   //development link
    const baseUrl = 'https://muncheze.onrender.com/api'; //local link
//   const baseUrl = 'http://192.168.1.175:4000/api'; //local link  

const getToken = async () => { 
  try {  
    const jsonValue = await AsyncStorage.getItem('user_info');
    return jsonValue != null ? JSON.parse(jsonValue).token : null;
  } catch (e) {
    console.log('Token was not fetched from the AsyncStorage');
  }
};
const getHeaders = async () => {
  let token = await getToken();
  if (token) {
    return {
      Authorization: 'Bearer ' + token,
    };
  } else {
    return null;
  }
};

export {
  //   articles,
  argonTheme,
  Images,
  baseUrl,
  getHeaders,
  //   tabs
};
