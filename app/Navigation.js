import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { NavigationContainer } from '@react-navigation/native';
//iconos que no se ven¿?
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


//screens
import Login from './Screen/Login';
import Register from './Screen/Register';
import Home from './Screen/Home';

const Tab  = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: 'blue',
                headerPressColor: 'red',
                headerTintColor:'white'
            }}
            >
            <Tab.Screen
                name = "Login"
                component={Login}
                options={{
                    tabBarLabel: "Login",
                    tabBarIcon: ({color, size}) => {
                        <MaterialCommunityIcons name="login" size={24} color="black" />                    }
                }}
                />

            <Tab.Screen
                name = "Home"
                component={Home}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({color, size}) => {
                        <SimpleLineIcons name="home" size={24} color="blue" />        
                    }
                }}
            />

            <Tab.Screen 
                name = "Register" 
                component={Register}/>
        </Tab.Navigator>
    );
}

export default function Navigation(){
    const navTheme = {
        colors: {
          background: "#193752"
        }
      };


    return (
        <NavigationContainer theme={navTheme}>
            <MyTabs/>
        </NavigationContainer>
        );

}