import React, {useState, useContext} from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {ScrollView, StyleSheet, Image} from 'react-native';
import {Block, Text, theme, Button} from 'galio-framework';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Images from '../constants/Images';
import DrawerItem from '../components/DrawerItem';
import {UserContext} from '../../src/context';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome';
import {argonTheme} from '../constants';

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const context = useContext(UserContext);
  const userData = context.user.data;
  // console.log(userData);
  const customerScreens = ['Home','About Us','Profile' ];

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('user_info');
      context.setUser({online: false, data: null});
    } catch (e) {
      console.log('Error in deleting the data');
    }
  };

  return (
    <Block
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}>
      {userData ? (
        <Block row style={styles.header}>
          <Text bold size={18}>
            Hi {userData.firstName},
          </Text>
          <FAIcon
            name="user-circle"
            color={argonTheme.COLORS.PRIMARY}
            size={35}
          />
        </Block>
      ) : null}
      {/* <Block middle flex={0.3} style={styles.header}>
        <Image style={styles.logo} source={Images.MunchezeLogo} />
      </Block> */}
      {userData ? (
        <Block flex style={{paddingLeft: 8, paddingRight: 14}}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {userData.isCustomer &&
              customerScreens.map((item, index) => {
                return (
                  <DrawerItem
                    title={item}
                    key={index}
                    navigation={navigation}
                    focused={state.index === index ? true : false}
                  />
                );
              })}
            <Block center>
              <Button onPress={() => logOut()}>Logout</Button>
            </Block>
          </ScrollView>
        </Block>
      ) : null}
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 60,
  },
});

export default CustomDrawerContent;
