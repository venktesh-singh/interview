import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  // Text
} from 'react-native';
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
import FAIcon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('screen');

const Register = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validateFlag, setValidateFlag] = useState({
    email: true,
    password: true,
    mobile: true,
  });
  const [mobileNumber, setMobileNumber] = useState('');
  const [isShow, setShow] = useState(false);
  const [toastInfo, setToastInfo] = useState({color: '', message: ''});
  const [privacy, setPrivacy] = useState(false);
  const [address, setAddress] = useState('');

  const validation = (name, value) => {
    if (name == 'email') {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(value) == false) {
        setEmail(value);
        setValidateFlag({...validateFlag, email: false});
        return;
      }

      setEmail(value);
      setValidateFlag({...validateFlag, email: true});
    } else if (name == 'password') {
      if (value.trim().length < 8) {
        setPassword(value.trim());
        setValidateFlag({...validateFlag, password: false});
        return;
      }
      setPassword(value);
      setValidateFlag({...validateFlag, password: true});
    } else {
      if (value.length < 10 || !Number(value)) {
        setMobileNumber(value);
        setValidateFlag({...validateFlag, mobile: false});
        return;
      }
      setMobileNumber(value);
      setValidateFlag({...validateFlag, mobile: true});
    }
  };

  const handleToast = (message, color) => {
    setShow(true);
    setToastInfo({message, color});
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  const register = () => {
    if (!firstName || !lastName || !email || !password || !mobileNumber) {
      handleToast('One or more fields are empty.', 'warning');
      return;
    } else if (
      !validateFlag.email ||
      !validateFlag.password ||
      !validateFlag.mobile
    ) {
      handleToast('Please enter valid values for the fields.', 'warning');
      return;
    } else if (!privacy) {
      handleToast('Please agree to the privacy policy.', 'warning');
      return;
    } else {
      let flag = 0;
      let data = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email,
        password: password.trim(),
        phoneNumber: mobileNumber.trim(),
        address: address.trim(),
        isAdmin: false,
        isCustomer: true,
        isVendor: false,
      };
      // console.log(data)
      try {
        fetch(`${baseUrl}/register`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => {
            if (response.status == 200) {
              handleToast(
                'Your account has been created successfully!!',
                'success',
              );
              return response.json();
            }
            ++flag;
            return response.json();
          })
          .then(responseData => {
            if (flag > 0) {
              handleToast(responseData.message, 'warning');
              --flag;
            } else {
              console.log('resMessageSuccess', responseData);
              setTimeout(() => {
                props.navigation.push('User', {screen: 'Login'});
              }, 2000);
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      {/* <StatusBar hidden={false} backgroundColor={argonTheme.COLORS.PRIMARY}/> */}
      <Block flex>
        <ImageBackground
          source={Images.RegisterBackground}
          style={{flex: 1, zIndex: 1}}>
          <Block center>
            <Image source={Images.MunchezeLogo} style={styles.logo} />
          </Block>
          <Block flex center>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
              <Block width={width * 0.8} style={{marginBottom: 15}}>
                <Input
                  borderless
                  placeholder="First Name"
                  placeholderTextColor={argonTheme.COLORS.PRIMARY}
                  color={argonTheme.COLORS.BLACK}
                  value={firstName}
                  onChangeText={text => setFirstName(text)}
                />
              </Block>
              <Block width={width * 0.8} style={{marginBottom: 15}}>
                <Input
                  borderless
                  placeholder="Last Name"
                  placeholderTextColor={argonTheme.COLORS.PRIMARY}
                  color={argonTheme.COLORS.BLACK}
                  value={lastName}
                  onChangeText={text => setLastName(text)}
                />
              </Block>

              <Block width={width * 0.8} style={{marginBottom: 15}}>
                <Input
                  borderless
                  placeholder="Email"
                  placeholderTextColor={argonTheme.COLORS.PRIMARY}
                  color={argonTheme.COLORS.BLACK}
                  value={email}
                  onChangeText={text => {
                    validation('email', text);
                  }}
                />
                {!validateFlag.email ? (
                  <Text color={argonTheme.COLORS.WARNING}>
                    *The email is invalid.
                  </Text>
                ) : null}
              </Block>
              <Block width={width * 0.8} style={{marginBottom: 15}}>
                <Input
                  password
                  borderless
                  placeholder="Password"
                  placeholderTextColor={argonTheme.COLORS.PRIMARY}
                  color={argonTheme.COLORS.BLACK}
                  value={password}
                  onChangeText={text => validation('password', text)}
                />
                {!validateFlag.password ? (
                  <Text color={argonTheme.COLORS.WARNING}>
                    *Password too short or invalid.
                  </Text>
                ) : null}
              </Block>
              <Block width={width * 0.8} style={{marginBottom: 15}}>
                <Input
                  keyboardType="numeric"
                  borderless
                  placeholder="Mobile Number"
                  placeholderTextColor={argonTheme.COLORS.PRIMARY}
                  color={argonTheme.COLORS.BLACK}
                  value={mobileNumber}
                  onChangeText={text => validation('mobileNumber', text)}
                />
                {!validateFlag.mobile ? (
                  <Text color={argonTheme.COLORS.WARNING}>
                    *Enter a valid mobile number
                  </Text>
                ) : null}
              </Block>

              <Block width={width * 0.8} style={{marginBottom: 15}}>
                <Input
                  borderless
                  placeholder="Address"
                  placeholderTextColor={argonTheme.COLORS.PRIMARY}
                  color={argonTheme.COLORS.BLACK}
                  value={address}
                  onChangeText={text => setAddress(text)}
                  numberOfLines={20}
                  multiline
                  style={{height: 100}}
                  textAlignVertical="top"
                />
              </Block>
              {/* <Block width={width * 0.8} center column style={{ marginBottom: 15}}>
              <Block><Text style={{ marginBottom: 10 }} bold color="#FFFFFF">Register as? </Text></Block>
              <Block row width={width * 0.9} space="evenly">
                {radioOptions.map((element) => {
                  return (
                    <View key={element.id} style={{ flexDirection: 'row' }}>
                      <TouchableOpacity onPress={() => radioClick(element.role)}>
                        <View style={styles.radioButton}>
                          {
                            element.role == radioSelected ?
                              <View style={styles.radioButtonSelected} />
                              : null
                          }
                        </View>
                      </TouchableOpacity>
                      <Text size={14} color={argonTheme.COLORS.WHITE}>{element.role}</Text>
                    </View>)
                })}
              </Block>
            </Block> */}

              <Block row width={width * 0.75}>
                <TouchableOpacity onPress={() => setPrivacy(!privacy)}>
                  {privacy ? (
                    <FAIcon
                      name="check-square-o"
                      color={argonTheme.COLORS.SUCCESS}
                      size={20}
                    />
                  ) : (
                    <FAIcon
                      name="square-o"
                      color={argonTheme.COLORS.PRIMARY}
                      size={20}
                    />
                  )}
                </TouchableOpacity>
                <Text size={14} color={argonTheme.COLORS.WHITE}>
                  {' '}
                  I agree with the
                </Text>

                <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                  {' '}
                  Privacy Policy.
                </Text>
              </Block>
              <Block middle>
                <Button style={styles.createButton} onPress={() => register()}>
                  <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                    CREATE ACCOUNT
                  </Text>
                </Button>
                <Button
                  onPress={() => props.navigation.push('Login')}
                  color={argonTheme.COLORS.SECONDARY}
                  style={styles.createButton}>
                  <Text bold size={14} color={argonTheme.COLORS.BLACK}>
                    Have an account?
                  </Text>
                </Button>
              </Block>
            </ScrollView>
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
    </>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width,
    // flex: 1,
    // height: height * 0.5,
    backgroundColor: '#F4F5F7',
    borderRadius: 4,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingTop: 15,
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
  radioButton: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: argonTheme.COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 5,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: argonTheme.COLORS.PRIMARY,
  },
  // socialConnect: {
  //   backgroundColor: argonTheme.COLORS.WHITE,
  //   borderBottomWidth: StyleSheet.hairlineWidth,
  //   borderColor: "#8898AA"
  // },
  // socialButtons: {
  //   width: 120,
  //   height: 40,
  //   backgroundColor: "#fff",
  //   shadowColor: argonTheme.COLORS.BLACK,
  //   shadowOffset: {
  //     width: 0,
  //     height: 4
  //   },
  //   shadowRadius: 8,
  //   shadowOpacity: 0.1,
  //   elevation: 1
  // },
  // socialTextButtons: {
  //   color: argonTheme.COLORS.PRIMARY,
  //   fontWeight: "800",
  //   fontSize: 14
  // },
  // inputIcons: {
  //   marginRight: 12
  // },
  // passwordCheck: {
  //   paddingLeft: 15,
  //   paddingTop: 13,
  //   paddingBottom: 30
  // },
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

export default Register;
