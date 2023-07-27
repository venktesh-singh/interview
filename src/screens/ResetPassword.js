import React, {useState} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';

import {Block, Button, Input, Text, Toast} from 'galio-framework';

import {Images, argonTheme, baseUrl} from '../constants/';
import {useRoute} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const ResetPassword = props => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isShow, setShow] = useState(false);
  const [toastInfo, setToastInfo] = useState({color: '', message: ''});
  const user_id = useRoute().params?.user_id;

  const handleToast = (message, color) => {
    setShow(true);
    setToastInfo({message, color});
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  const onPressResetPassword = () => {
    if (newPassword !== confirmNewPassword) {
      handleToast('The two passwords does not match', 'error');
      return;
    }
    axios({
      method: 'post',
      url: `${baseUrl}/communication/resetPassword`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {newPassword, user_id},
    })
      .then(response => {
        if (response.data.status === 'success') {
          handleToast('Password resetted successfully', 'success');
          props?.navigation?.push('Login');
        } else {
          handleToast(response?.data?.message, 'error');
        }
      })
      .catch(e => {
        handleToast(e?.message, 'error');
      });
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
                placeholder="New Password"
                placeholderTextColor={argonTheme.COLORS.PRIMARY}
                color={argonTheme.COLORS.BLACK}
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
              />
            </Block>
            <Block width={width * 0.8} style={{marginBottom: 15}}>
              <Input
                password
                borderless
                placeholder="Confirm New Password"
                placeholderTextColor={argonTheme.COLORS.PRIMARY}
                color={argonTheme.COLORS.BLACK}
                value={confirmNewPassword}
                onChangeText={text => setConfirmNewPassword(text)}
              />
            </Block>

            <Block middle>
              <Button
                style={styles.createButton}
                onPress={onPressResetPassword}>
                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                  Reset Password
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

export default ResetPassword;
