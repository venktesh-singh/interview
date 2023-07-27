import React, {useState, useContext} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../context';

import {
  Block,
  Checkbox,
  theme,
  Button,
  Input,
  Radio,
  Text,
  Toast,
} from 'galio-framework';

//  import { Button, Icon, Input } from "../components";
import {Images, argonTheme, baseUrl} from '../constants/';
import {requestNotificationPermission} from '../utils/notifications';
// import {navigate} from '@react-navigation/compat/lib/typescript/src/NavigationActions';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
const {width, height} = Dimensions.get('screen');

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShow, setShow] = useState(false);
  const [toastInfo, setToastInfo] = useState({color: '', message: ''});
  const context = useContext(UserContext);
  const navigation = useNavigation();
  const handleToast = (message, color) => {
    setShow(true);
    setToastInfo({message, color});
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };
  const signIn = async () => {
    let token = await requestNotificationPermission();
    if (email && password) {
      let data = {
        email: email,
        password: password,
        fcmToken: token,
      };

      axios({
        method: 'post',
        url: `${baseUrl}/login`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: data,
      })
        .then(async response => {
          console.log('====>responseLogin', response.data.data);
          if (response.data.data.isCustomer) {
            let user_info = JSON.stringify(response.data.data);
            context.setUser({online: true, data: JSON.parse(user_info)});
            await AsyncStorage.setItem('user_info', user_info);
            console.log('====>User_info', user_info);
            // props.navigation.push('App', {screen: 'Home'});
            navigation.navigate('App', {screen: 'Home'});
          } else {
            handleToast('You are not registered as a customer', 'error');
          }
        })
        .catch(error => {
          console.log(error, 'errrrrr');
          if (error.response) {
            handleToast(error.response.data.message, 'warning');
            // return;
          }
          // console.log(typeof error)
          handleToast('Network error!', 'error');
        });
    } else {
      handleToast('Please fill your details', 'warning');
    }
  };

  return (
    <Block flex space="between">
      <ImageBackground
        source={Images.RegisterBackground}
        style={{width, height, zIndex: 1, paddingTop: 25}}>
        <Block center>
          <Image source={Images.MunchezeLogo} style={styles.logo} />
        </Block>
        <Block flex center>
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
            <Block width={width * 0.8} style={{marginBottom: 15}}>
              <Input
                borderless
                placeholder="Email"
                placeholderTextColor={argonTheme.COLORS.PRIMARY}
                color={argonTheme.COLORS.BLACK}
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </Block>
            <Block width={width * 0.8} style={{marginBottom: 15}}>
              <Input
                password
                borderless
                placeholder="Password"
                placeholderTextColor={argonTheme.COLORS.PRIMARY}
                color={argonTheme.COLORS.BLACK}
                value={password}
                onChangeText={text => setPassword(text)}
              />
            </Block>
            <Block column center width={width * 0.8} style={{marginBottom: 15}}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.push('Otp Verification');
                }}>
                <Text style={{marginBottom: 12}} bold color="#FFFFFF">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </Block>

            <Block middle>
              <Button style={styles.createButton} onPress={() => signIn()}>
                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                  Log In
                </Text>
              </Button>
              <Button
                onPress={() => props.navigation.push('Register')}
                color={argonTheme.COLORS.SECONDARY}
                style={styles.createButton}>
                <Text bold size={14} color={argonTheme.COLORS.BLACK}>
                  Don't have an account?
                </Text>
              </Button>
            </Block>
          </KeyboardAvoidingView>
        </Block>
      </ImageBackground>
      <Toast
        isShow={isShow}
        style={styles.toast}
        positionIndicator="top"
        color={toastInfo.color}>
        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
          {toastInfo.message}
        </Text>
      </Toast>
    </Block>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    // flex: 1,
    // height: height * 0.5,
    backgroundColor: '#F4F5F7',
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  logo: {
    width: 200,
    height: 200,
    zIndex: 2,
    position: 'relative',
    borderRadius: 50,
    // marginTop: '-50%'
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 20,
    elevation: 10,
  },
  toast: {
    position: 'absolute',
    top: 0,
  },
});

export default Login;
