import React, { useEffect,useState,useRef }  from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer"
import Profile  from "../Screen/UserProfile";
import Viajar from "../Screen/Map_Google";
import SearchUser from '../Screen/SearchUser';
import MyTrips from "../Screen/MyTrips"
import MyConversations from "../Screen/MyConversations"
import Configuration from "../Screen/Configuration"
import Waiting from '../Screen/Waiting/Waiting';
import Build_trip from '../Screen/Build_trip'
import Home_Driver from '../Screen/Home_Driver';
import CustomDrawer from './CustomDrawer';
import  Route_Map from '../Screen/Waiting/Route_map'
import Edit_Profile from '../Screen/Edit Profile';
import Trip_Found from '../Screen/Waiting/trip found'
import { Score} from '../Screen/Score'
import { ProfileImage} from '../Screen/ProfileImage'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import {GoTo} from '../components/Noficationfunctions'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from '../components/registerPushNotificationsAsync';


const Drawer = createDrawerNavigator()
import {currentSession} from '../context'


export default function DrawerNavigator() {
    const context = currentSession();
    const [notif, setNotif] = useState(false);

//**************************** */
//Notification
const [expoPushToken, setExpoPushToken] = useState('');
const [notification, setNotification] = useState(false);
const notificationListener = useRef();
const responseListener = useRef();
var Go_to;

const Noti = Notifications;
Noti.setNotificationHandler({
handleNotification: async () => ({
  shouldShowAlert: true,
  shouldPlaySound: false,
  shouldSetBadge: false,
}),
});

const Notif = () =>{
registerForPushNotificationsAsync().then((token) =>
setExpoPushToken(token)
);

notificationListener.current =
  Noti.addNotificationReceivedListener((notification) => {
    setNotification(notification);
  });

responseListener.current =
  Noti.addNotificationResponseReceivedListener((response) => {
    //console.log(response.notification.request.content.data);
    Go_to =response.notification.request.content.data.data;
    console.log(Go_to)
    GoTo(Go_to)
  });

return () => {
  Noti.removeNotificationSubscription(
    notificationListener.current
  );
  Noti.removeNotificationSubscription(responseListener.current);
};
}

//***************************** */

const getProfile = async () => {  
    const jsonValue = await AsyncStorage.getItem('userprofile');
    const userProfile =  JSON.parse(jsonValue);  
    return userProfile;

}

       //Hook
   useFocusEffect(
    React.useCallback(() => {
 //      alert('Screen was focused');
          getProfile().then((keyValue) => {

          });
 
          return () => {
          //   alert('Screen was unfocused');
          };
    }, [])
    );

    useEffect(() => {
        //console.log("DrawerNavigator");
        if (context.use) {
            if (notif==false){
                Notif()
                setNotif(true)
                console.log('notification')
            }
        }
        else
        {
            setNotif(false)
        }
      }, [context.user]);

    return(
            <Drawer.Navigator 
                initialRouteName='Home' 
                drawerContent={props => 
                    <CustomDrawer {...props} />
                }>

                 {(() => {
                        if (context.passenger ){
                            return (
                                <React.Fragment>
                                    <Drawer.Screen 
                                        name = "Home" 
                                        component={Build_trip}
                                        options={{
                                            drawerIcon: () => (
                                                <Entypo name="home" size={24} color="black" />
                                            )
                                        }}/>
                            </React.Fragment>
                            )
                        }
                        else {
                            return (
                                <React.Fragment>
                                    <Drawer.Screen 
                                        name = "Home" 
                                        component={Home_Driver}
                                        options={{
                                            drawerIcon: () => (
                                                <Entypo name="home" size={24} color="black" />
                                            )
                                        }}/>
                            </React.Fragment>
                            )
                        }
                       
                 })()} 
                <Drawer.Screen 
                    name = "Profile" 
                    component={Profile}
                    options={{
                        drawerIcon: () => (
                            <MaterialCommunityIcons name="account-circle" size={24} color="black" />
                        ) 
                    }}/>
                <Drawer.Screen 
                    name = "SearchUser" 
                    component={SearchUser}
                    options={{
                        title: 'Wallet', 
                        drawerItemStyle: {
                            display: "none",
                        },
                        unmountOnBlur: true,

                    }}/>
                <Drawer.Screen 
                    name = "MyTrips"
                    component={MyTrips}
                    options={{
                        drawerItemStyle: {
                            display: "none",
                        },
                        title: 'History',
                        unmountOnBlur: true,
                    }}/>
                <Drawer.Screen 
                    name = "MyConversations"
                    component={MyConversations}
                    options={{
                        drawerItemStyle: {
                            display: "none",
                        },
                    }}/>
                <Drawer.Screen 
                    name = "Configuration" 
                    component={Configuration}
                    options={{
                        drawerItemStyle: {
                            display: "none",
                        },
                    }}/>
                <Drawer.Screen 
                    name = "Realizar Viaje" 
                    component={Viajar}
                    options={{
                        drawerItemStyle: {
                            display: "none",
                        },
                    }}/>  
                <Drawer.Screen 
                    name = "Searching" 
                    component={Waiting}
                    options={{
                        drawerItemStyle: {
                            display: 'none',
                        },
                        unmountOnBlur: true,

                    }}/>

                <Drawer.Screen 
                    name = "Route Map" 
                    component={Route_Map}
                    options={{
                        
                        drawerItemStyle: {
                            display: 'none',
                        },headerShown: false,
                        unmountOnBlur: true,
                    }}/>
                <Drawer.Screen 
                    name = "Edit Profile"  
                    component={Edit_Profile}
                    options={{
                        drawerItemStyle: {
                            display: 'none',
                        }, 
                        unmountOnBlur: true,

                    }}/>         
                <Drawer.Screen 
                    name = "Trip_Found"  
                    component={Trip_Found}
                    options={{
                        drawerItemStyle: {
                            display: 'none',
                        },
                        title: 'Trip found'
                    }}/>       
                <Drawer.Screen 
                    name = "Rating"  
                    component={Score}
                    options={{
                        drawerItemStyle: {
                            display: 'none',
                        },
                        title: 'Rate User',
                        unmountOnBlur: true,
                        headerShown: false,
                    }}/>                
                <Drawer.Screen 
                    name = "Profile Image"  
                    component={ProfileImage}
                    options={{
                        drawerItemStyle: {
                            display: 'none',
                        },
                        title: 'Choose an icon',
                        unmountOnBlur: true,
                        headerShown: false,
                    }}/>    
            </Drawer.Navigator>
        
      );
    
}