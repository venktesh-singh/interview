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

const {width, height} = Dimensions.get('screen');

const OtpVerification = props => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isShow, setShow] = useState(false);
  const [toastInfo, setToastInfo] = useState({color: '', message: ''});
  const [otpData, setOtpData] = useState({});

  const handleToast = (message, color) => {
    setShow(true);
    setToastInfo({message, color});
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  const onClickSendVerifyOtp = () => {
    if (!showOtp) {
      axios({
        method: 'post',
        url: `${baseUrl}/communication/sendOtp`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {email},
      })
        .then(response => {
          console.log(response, 'mahResp');
          if (response.data.status === 'success') {
            setShowOtp(true);
            setOtpData(response?.data?.data);
            handleToast('Otp has been sent', 'success');
          } else {
            handleToast(response?.data?.message, 'error');
          }
        })
        .catch(e => {
          handleToast(e?.message, 'error');
        });
    } else {
      axios({
        method: 'post',
        url: `${baseUrl}/communication/verifyOtp`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {user_id: otpData?.user_id, otp: Number(otp)},
      })
        .then(response => {
          if (response.data.status === 'success') {
            handleToast('Otp has been verified', 'error');
            props?.navigation?.push('Reset Password', {
              user_id: otpData?.user_id,
            });
          } else {
            handleToast(response?.data?.message, 'error');
          }
        })
        .catch(e => {
          handleToast(e?.message, 'error');
        });
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
            <Block
              width={width * 0.8}
              style={{marginBottom: 15, marginTop: 80}}>
              {!showOtp && (
                <Input
                  borderless
                  placeholder="Enter email to get OTP"
                  placeholderTextColor={argonTheme.COLORS.PRIMARY}
                  color={argonTheme.COLORS.BLACK}
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              )}
              {showOtp && (
                <Input
                  borderless
                  placeholder="Enter OTP"
                  placeholderTextColor={argonTheme.COLORS.PRIMARY}
                  color={argonTheme.COLORS.BLACK}
                  value={otp}
                  onChangeText={text => setOtp(text)}
                />
              )}
            </Block>

            <Block middle>
              <Button
                style={styles.createButton}
                onPress={onClickSendVerifyOtp}>
                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                  {showOtp ? 'Verify OTP' : 'Send OTP'}
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

export default OtpVerification;
