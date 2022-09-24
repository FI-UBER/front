import React from 'react';
import {createRef} from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
//iconos que no se ven¿?
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


//screens
import Login from './Screen/Login';
import Register from './Screen/Register';
import Home from './Screen/Home';
import Home_Login from './Screen/Home_Login';
import SearchUser from './Screen/SearchUser'
import Map_Google from './Screen/Map_Google';

const stack = createNativeStackNavigator();

//Stack de arriba
function Mstack() {
    return(
        <stack.Navigator
            initialRouteName="HomeScreen">

            <stack.Screen
            name= "HomeScreen Logeado"
            component={Home_Login}
            options={{
                headerShown:false
            }}>
            </stack.Screen>


            <stack.Screen
            name= "HomeScreen"
            component={Home}>
   
            </stack.Screen>

            <stack.Screen
                name = "SearchUser"
                component = {SearchUser}
                options = {{title: 'Buscar usuario'}}
                />

            <stack.Screen
                name= "Map_Google"
                component={Map_Google} 
                options = {{title: 'Realizar viaje'}}/>

            </stack.Navigator>
    )
}

const Tab  = createBottomTabNavigator();
//Navigation de abajo
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
                component={Mstack}
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
        <NavigationContainer 
            ref={createRef()} 
            theme={navTheme}>
            <MyTabs/>
        </NavigationContainer>
        );

}