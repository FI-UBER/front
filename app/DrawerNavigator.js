import React, { useState, useEffect }  from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer"
import { NavigationContainer } from '@react-navigation/native';

import Notification from './components/Notification';
import Profile  from "./Screen/UserProfile";
import Viajar from "./Screen/Map_Google";
import Home_Login from './Screen/Home_Login';
import SearchUser from './Screen/SearchUser';
import Login from './Screen/Login';
import MyTrips from "./Screen/MyTrips"
import MyConversations from "./Screen/MyConversations"
import Configuration from "./Screen/Configuration"
import  Register  from "./Screen/Register";
import Waiting from './Screen/Waiting/Waiting';
import Route_Map from './Screen/Waiting/Route_map';
import {logout} from './components/RegisterUser'

const Drawer = createDrawerNavigator()
import {currentSession} from './context'

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
                        <DrawerItem label="Logout" onPress={() => {
                            logout()
                            context.logout()
                        }} />
                    </DrawerContentScrollView>
                    )
                }}
            >
                <Drawer.Screen 
                    name = "Login" 
                    component={Login}
                    options ={{
                        
                        headerLeftLabelVisible: true,
                        drawerItemStyle: {
                            display: showNotLogin,
                        }
                    }}
                   />
                <Drawer.Screen 
                    name = "Register" 
                    component={Register}
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

                {(() => {
                if (!context.user ){
                    return (
                        <React.Fragment>
                        <Drawer.Screen 
                        name = "Realizar Viaje" 
                        component={Viajar}
                        options={{
                            drawerItemStyle: {
                                display: "none",
                            },
                        }}>
                        </Drawer.Screen>

                        <Drawer.Screen 
                            name = "Search Screen" 
                            component={Waiting}
                            options={{
                                drawerItemStyle: {
                                    display: 'none',
                                },
                            }}>
                        </Drawer.Screen>
                    </React.Fragment>
                    )
                }
                else {
                    if (context.passenger )
                    {
                        return (
                            <React.Fragment>
                            <Drawer.Screen 
                            name = "Realizar Viaje" 
                            component={Viajar}
                            options={{
                                drawerItemStyle: {
                                    display: "flex",
                                },
                            }}>
                            </Drawer.Screen>
                            <Drawer.Screen 
                                name = "Search Screen" 
                                component={Waiting}
                                options={{
                                    drawerItemStyle: {
                                        display: 'none',
                                    },
                                }}>
                            </Drawer.Screen>
                            </React.Fragment>
                        )
                        }
                        else {
                        return (
                            <React.Fragment>
                                <Drawer.Screen 
                                    name = "Search Screen" 
                                    component={Waiting}
                                    options={{
                                        drawerItemStyle: {
                                            display: 'flex',
                                        },
                                    }}>
                                </Drawer.Screen>
                                <Drawer.Screen 
                                    name = "Realizar Viaje" 
                                    component={Viajar}
                                    options={{
                                        drawerItemStyle: {
                                            display: "none",
                                        },
                                    }}>
                                </Drawer.Screen>
                            </React.Fragment>
                            )
                        }
                    }
                 })()}
                <Drawer.Screen 
                    name = "SearchUser" 
                    component={SearchUser}
                    options={{
                        drawerItemStyle: {
                            display: "none",
                        },
                    }}>
                </Drawer.Screen>
                <Drawer.Screen 
                    name = "MyTrips"
                    component={MyTrips}
                    options={{
                        drawerItemStyle: {
                            display: "none",
                        },
                    }}>
                </Drawer.Screen>
                <Drawer.Screen 
                    name = "MyConversations"
                    component={MyConversations}
                    options={{
                        drawerItemStyle: {
                            display: "none",
                        },
                    }}>
                </Drawer.Screen>
                <Drawer.Screen 
                    name = "Configuration" 
                    component={Configuration}
                    options={{
                        drawerItemStyle: {
                            display: "none",
                        },
                    }}>
                </Drawer.Screen>
                <Drawer.Screen 
                    name = "Route Map" 
                    component={Route_Map}
                    options={{
                        drawerItemStyle: {
                            display: "flex",
                        },
                    }}>
                </Drawer.Screen>
                {/* <Drawer.Screen 
                    name = "Notification" 
                    component={Notification}
                    options={{
                        drawerItemStyle: {
                            display: "flex",
                        },
                    }}>
                </Drawer.Screen> */}

            </Drawer.Navigator>
        </NavigationContainer>
      );
    
}