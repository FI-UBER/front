import React, { useState, useEffect }  from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer"
import { NavigationContainer } from '@react-navigation/native';

import SettingsScreen from "./Screen/Settings"
import Profile  from "./Screen/Profile";
import Viajar from "./Screen/Map_Google";
import Home_Login from './Screen/Home_Login';
import SearchUser from './Screen/SearchUser';
import Login from './Screen/Login';

const Drawer = createDrawerNavigator()
import {currentSession} from './context'
import { Alert } from 'react-native-web';

export default function DrawerNavigator() {
    const context = currentSession();
    const [showLogin, setLogin] = React.useState("none");
    const [showNotLogin, setNotLogin] =  React.useState("flex");



    useEffect(() => {
        //console.log("DrawerNavigator");
        if (context.user) {
            setLogin("flex");
            setNotLogin("none");    
        } else {
            setLogin("none");
            setNotLogin("flex");
        }
        
      }, [context.user]);



    return(
        <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName='Login'
                drawerContent={props => {
                    return (
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                        <DrawerItem label="Logout" onPress={() => context.logout()} />
                    </DrawerContentScrollView>
                    )
                }}
            >
                <Drawer.Screen 
                    name = "Login" 
                    component={Login}
                    options ={{
                        
                        drawerItemStyle: {
                            display: showNotLogin,
                        }
                    }}
                   />
                <Drawer.Screen 
                    name = "Home Login" 
                    component={Home_Login}
                    options={{
                        drawerItemStyle: {
                            display: showLogin,
                        },
                    }}>
                </Drawer.Screen>     
                <Drawer.Screen 
                    name = "Profile" 
                    component={Profile}
                    options={{
                        drawerItemStyle: {
                            display: showLogin,
                        },
                    }}>
                </Drawer.Screen>
                <Drawer.Screen 
                    name = "Settings" 
                    component={SettingsScreen}>
                </Drawer.Screen>
                <Drawer.Screen 
                    name = "Realizar Viaje" 
                    component={Viajar}
                    options={{
                        drawerItemStyle: {
                            display: showLogin,
                        },
                    }}>
                </Drawer.Screen>
                <Drawer.Screen 
                    name = "SearchUser" 
                    component={SearchUser}
                    options={{
                        drawerItemStyle: {
                            display: showLogin,
                        },
                    }}>
                </Drawer.Screen>
            </Drawer.Navigator>
        </NavigationContainer>
      );
    
}