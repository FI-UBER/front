import React, { Component, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet,Image } from 'react-native';
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'
import {currentSession} from '../context'
import {logout} from '../components/RegisterUser'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

//Iconos
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomDrawer = (props) => {
   const context = currentSession();

   const [profile,setprofile] = React.useState("");

   const getProfile = async () => {  
       const jsonValue = await AsyncStorage.getItem('userprofile');
       const userProfile =  JSON.parse(jsonValue);  
       if (userProfile !== null) {
           setprofile(userProfile);
       }
       return userProfile;

   }

   //Hook
   useFocusEffect(
   React.useCallback(() => {
//      alert('Screen was focused');
         getProfile().then((keyValue) => {
            console.log("custom",keyValue.name)
         });

         return () => {
         //   alert('Screen was unfocused');
         };
   }, [])
   );

   useEffect(() => {  
      getProfile().then((keyValue) => {
          //nothing
   });

  },[setprofile, profile]);
  
    return (

      <DrawerContentScrollView {...props}>
      <View style={{flex:1, alignItems:"center"}}>
         <ImageBackground 
            source={require('../assets/background.png')}
            style={{padding: 20}}>
            <Image
            source={require('../assets/profilepic.jpg')}
            style={styles.avatar}
            onPress={() => {
               console.log('Press')
            }}/>
            <Text 
               style={styles.textname}>
               {profile.name} {profile.lastName}
            </Text>
         </ImageBackground>
      </View>
         <DrawerItemList {...props} />
         <DrawerItem 
            label="Logout" 
            icon= { () => <MaterialCommunityIcons name="logout" size={24} color="black" />}
            onPress={() => {
               //AsyncStorage.removeItem('userprofile', (err) => console.log('userId', err)).then((fgf) =>{
               logout()
               context.logout()
         }
      } />
      </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
   avatar: {
      width: 100,
      height: 100,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
  },
   textname: { 
      alignItems: "center",
      color:"black",
      fontSize: 20
   }
})

export default CustomDrawer;
