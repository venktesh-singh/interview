import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

//  import { Button, Icon, Input } from "../components";
import {Images, argonTheme, baseUrl} from '../constants';
import Theme from '../constants/Theme';
import moment from 'moment';

const {width, height} = Dimensions.get('screen');

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    (async () => {
      let user_info = await getUser();
      setUserInfo(user_info);
    })();
  }, []);

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user_info');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('UserInfo was not fetched from the AsyncStorage');
      console.log('error in comp', e);
    }
  };
  return (
    <>
      <Header title="Your Profile" />
      <View style={styles.main}>
        <Image style={styles.image} source={Images.MunchezeLogo} />
        <View style={styles.detailsContainer}>
          <Text style={styles.mainHeading}>First Name</Text>
          <Text style={styles.mainText}>{userInfo?.firstName}</Text>
          <Text style={styles.mainHeading}>Last Name</Text>
          <Text style={styles.mainText}>{userInfo?.lastName}</Text>
          <Text style={styles.mainHeading}>Email</Text>
          <Text style={styles.mainText}>{userInfo?.email}</Text>
          <Text style={styles.mainHeading}>Address</Text>
          <Text style={styles.mainText}>{userInfo?.address || '-'}</Text>
          <Text style={styles.mainHeading}>Joining Date</Text>
          <Text style={styles.mainText}>
            {moment(userInfo?.joiningDate).format('DD MMM YYYY')}
          </Text>
        </View>
      </View>
      <Footer title="footer" />
    </>  
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Arrange children with space between them (footer at the bottom)
  },
  main: {
    flex: 1, // Take the available space
    padding: 15,
    paddingHorizontal: 25,
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: '#fff',
    elevation: 2,
  },
  mainHeading: {
    color: Theme.COLORS.PRIMARY,
    fontWeight: '700',
    fontSize: 20,
    marginTop: 15,
  },
  mainText: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingBottom: 10,
  },
});