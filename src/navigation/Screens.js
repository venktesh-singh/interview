import React, {useContext} from 'react';
import {Dimensions} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Onboarding from '../screens/Onboarding';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Home from '../screens/Home';
import CustomDrawerContent from './Menu';
import {UserContext} from './../context';
import Profile from '../screens/Profile';
import AboutUs from '../screens/AboutUs'; 
import Product from '../screens/Product'; 
import TruckList from '../screens/TruckList';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome';
import {Images, argonTheme, baseUrl} from '../constants';
import Menu from '../screens/Menu';
import Orders from '../screens/Orders'
import OrderDetails from '../screens/OrderDetails';
import {NavigationContainer} from '@react-navigation/native';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import OtpVerification from '../screens/OtpVerification';
import ResetPassword from '../screens/ResetPassword';
import Reviews from '../screens/Reviews';
import AddReview from '../screens/AddReview';
import SelectedTrcuk from '../screens/SelectedTruck';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('screen');

export default function OnboardingStack(props) {
  const context = useContext(UserContext);
  const userOnline = context.user.online;

  function UserStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="none">
        <Stack.Screen
          name="Register"
          component={Register}
          option={{
            headerTransparent: true,
          }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp Verification" component={OtpVerification} />
        <Stack.Screen name="Reset Password" component={ResetPassword} />
      </Stack.Navigator>
    );
  }

  function HomeStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="none" initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Stack.Screen name="Reviews" component={Reviews} />
        <Stack.Screen name="Add Review" component={AddReview} />
        <Stack.Screen name="About Us" component={AboutUs} />
        <Stack.Screen name="Product Info" component={Product} />
      </Stack.Navigator>
    );
  }

  function TruckStack(props) {
    return (
      <Stack.Navigator
        mode="card"
        headerMode="none"
        initialRouteName="TruckList">
        <Stack.Screen
          name="TruckList"
          component={TruckList}
          option={{
            headerTransparent: true,
          }}
        />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Reviews" component={Reviews} />
      </Stack.Navigator>
    );
  }

  function AppStack(props) {
    return (
      <Drawer.Navigator
        style={{flex: 1}}
        drawerContent={props => <CustomDrawerContent {...props} />}
        drawerStyle={{
          backgroundColor: 'white',
          width: width * 0.8,
        }}
        drawerContentOptions={{
          activeTintcolor: 'white',
          inactiveTintColor: '#000',
          activeBackgroundColor: 'transparent',
          itemStyle: {
            width: width * 0.75,
            backgroundColor: 'transparent',
            paddingVertical: 16,
            paddingHorizonal: 12,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          },
          labelStyle: {
            fontSize: 18,
            marginLeft: 12,
            fontWeight: 'normal',
          },
        }}
        initialRouteName="HomeStack">
        <Drawer.Screen name="HomeStack" component={HomeStack} />
        <Drawer.Screen name="Trucks" component={TruckStack} />
        <Drawer.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Order Details" component={OrderDetails} />
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator>
    );
  }
  return (
    <Stack.Navigator mode="card" headerMode="none">
      {!userOnline ? (
        <>
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            option={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen name="User" component={UserStack} />
        </>
      ) : (
        <Stack.Screen name="App" component={AppStack} />
      )}
    </Stack.Navigator>
  );
}
