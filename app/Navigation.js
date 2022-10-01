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
import UserProfile from './Screen/UserProfile'
import MyTrips from "./Screen/MyTrips"
import MyConversations from "./Screen/MyConversations"
import Configuration from "./Screen/Configuration"

const MeLogee=false;

const stack = createNativeStackNavigator();

//Stack de arriba
function Mstack() {
    return(
        <stack.Navigator
        screenOptions={{
            cardStyle: {
              backgroundColor: 'transparent',
              opacity:1,
              statusBarColor: 'black',
        
            },
            //animationEnabled: false,
            //headerShown: false,
          }}
            initialRouteName="HomeScreen"
        >

            <stack.Screen
                name= "HomeScreen Logeado"
                component={Home_Login}
                options={{
                    headerShown:false
            }}>
            </stack.Screen>


            <stack.Screen
                name= "HomeScreen"
                component={Home}
                options={{
                    headerShown:false
            }}>
   
            </stack.Screen>

            <stack.Screen
                name = "SearchUser"
                component = {SearchUser}
                options = {{
                    title: 'Buscar usuario',
                    statusBarColor: '#193752',
                    headerShown: false,
                }}
                />

            <stack.Screen
                name = "UserProfile"
                component = {UserProfile}
                options = {{
                    //title: 'usr',
                    statusBarColor: '#193752',
                    headerShown: false,
                }}
                />

            <stack.Screen
                name= "Map_Google"
                component={Map_Google} 
                options = {{
                    title: 'Realizar viaje',
                    statusBarColor: '#193752',
                    headerTransparent:true
                }}/>

            <stack.Screen
                name= "MyTrips"
                component={MyTrips} 
                options = {{
                    title: 'Mis viajes',
                    statusBarColor: '#193752',
                    headerShown: false,
                }}
            />

            <stack.Screen
                name= "MyConversations"
                component={MyConversations} 
                options = {{
                    title: 'Mis conversaciones',
                    statusBarColor: '#193752',
                    headerShown: false,
                }}
            />

            <stack.Screen
                name= "Configuration"
                component={Configuration} 
                options = {{
                    title: 'Configuration',
                    statusBarColor: '#193752',
                    headerShown: false,
                }}
            />

            </stack.Navigator>
    )
}

const Tab  = createBottomTabNavigator();
//Navigation de abajo
function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            >
            <Tab.Screen
                name = "Login"
                component={Login}
                options={{
                    headerShown: false,
                    tabBarLabel: "Login",
                    tabBarIcon: ({color, size}) => {
                        <MaterialCommunityIcons name="login" size={24} color="black" />                    }
                }}
                />

            <Tab.Screen
                name = "Home"
                component={Mstack}
                options={{
                    headerShown: false,
                    tabBarLabel: "Home",
                    tabBarIcon: ({color, size}) => {
                        <SimpleLineIcons name="home" size={24} color="blue" />        
                    }
                }}
            />

            <Tab.Screen 
                name = "Register" 
                component={Register}
                options={{
                    headerShown: false,
                }}/>
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