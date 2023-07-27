import React from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import {Block, Button, Text, theme} from 'galio-framework';
import {Images, argonTheme} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('screen');
class Onboarding extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden={false} backgroundColor={argonTheme.COLORS.PRIMARY} />
        <Block flex center>
          <ImageBackground
            source={Images.Onboarding}
            style={{height, width, zIndex: 1}}
          />
        </Block>
        <Block center>
          <Image source={Images.MunchezeLogo} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{zIndex: 2}}>
            <Block center>
              <Button
                style={styles.button}
                color={argonTheme.COLORS.PRIMARY}
                onPress={() =>
                  navigation.navigate('User', {screen: 'Register'})
                }
                textStyle={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                Register
              </Button>
              <Button
                style={styles.button}
                color={argonTheme.COLORS.PRIMARY}
                onPress={() => navigation.navigate('User', {screen: 'Login'})}
                textStyle={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                Login
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F07238',
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  logo: {
    width: 400,
    height: 400,
    zIndex: 2,
    position: 'relative',
    borderRadius: 50,
    marginTop: '-50%',
  },
  title: {
    marginTop: '-5%',
  },
  subTitle: {
    marginTop: 20,
  },
});

export default Onboarding;
