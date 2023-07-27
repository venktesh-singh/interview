import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './../screens/Register'


const Stack = createStackNavigator();

function Routes() {
   
    return (
        <Stack.Navigator
            headerMode='none'
        >
           
                    <Stack.Screen name="Register" component={Register} />
              
            
        </Stack.Navigator>
    )
}

export default Routes;