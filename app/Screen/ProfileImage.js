import React, { useEffect } from 'react';
import {  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import {currentSession} from '../context'
import {Button} from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { data_update } from '../components/user_ap_endpoint';

import { Avatar } from 'react-native-paper';

export const ProfileImage = ({route,navigation}) => {
   const context = currentSession();

   const [profile,setprofile] = React.useState("");
   const [Iprofile, setIProfile] = React.useState("")
   const getProfile = async () => {  
      const jsonValue = await AsyncStorage.getItem('userprofile');
      const userProfile =  JSON.parse(jsonValue);  
      if (userProfile !== null) {
          setprofile(userProfile);
      }
      return userProfile;
   }


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

   const update = (idPic) => {
      var Pic, name, lastName, email, city, country, WalletAdress, WalletPrivateKey;
      email = profile.email;
      city = profile.city;
      country = profile.country;
      WalletAdress= profile.WalletAdress;
      WalletPrivateKey = profile.WalletPrivateKey;
      name = profile.name;;
      lastName = profile.lastName;

      getProfile().then(async(keyValue) => {
         if (idPic==''){
            Pic = 0;
         }
         else {
            Pic = idPic
         }
        
         data_update({name:name, lastname:lastName, 
                      id: context.uid, 
                      rol: context.passenger ? "passenger" : "driver",
                     idProfile: Number(Pic)});

         console.log(idPic)
         AsyncStorage.setItem('userprofile', JSON.stringify({'name': name, 'lastName': lastName, 'email': email,
          'city': 'Buenos Aires', 'country': 'Argentina', 'WalletAdress': WalletAdress, 'WalletPrivateKey': WalletPrivateKey, 'idPic': Pic}));     
         
      });
   }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.space} >
            <Text style={styles.Text}>Choose an icon for your profile  </Text>
        </View>
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}>
         <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
               update(1)
               navigation.navigate("Profile");
            }}
            >
           <Avatar.Image style={styles.icon_separator} size={100} source={require('../assets/user1.png')} />
         </TouchableOpacity>
         <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
               update(2)
               navigation.navigate("Profile");
            }}
            >
           <Avatar.Image style={styles.icon_separator} size={100} source={require('../assets/user2.png')} />
           </TouchableOpacity>
           <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
               update(3)
               navigation.navigate("Profile");
            }}
            >
           <Avatar.Image style={styles.icon_separator} size={100} source={require('../assets/user3.png')} />
           </TouchableOpacity>
           <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
               update(4)
               navigation.navigate("Profile");
            }}
            >
           <Avatar.Image style={styles.icon_separator} size={100} source={require('../assets/user4.png')} />
           </TouchableOpacity>
        </View>
        <View  style={styles.button_container}>
            <Button  
              style={styles.button}
              mode={"contained"} 
              onPress= {() =>{
               update(Iprofile)
                  navigation.navigate("Profile");
               }}
              buttonColor="green" 
              > Calcel
            </Button>
         </View>
      </SafeAreaView>
    )
}


const styles = StyleSheet.create({
   icon_separator:{
      margin:Dimensions.get("window").height * 0.02
   },
   space:{
      flex:0.8,
      justifyContent: 'center',
      alignContent: 'center'
   },
   container: {
       flex: 1,
       padding: 10,
       justifyContent: 'center',
       backgroundColor: "white"
   },
   Text:{
      textAlign: 'center',
      fontSize: 23,
   },
   button_container: {
      flex:1,  
      alignItems: 'center',
      justifyContent:'center',
  },
  button: {
    width:"50%",
    //height:"30%",
    margin:30,
},
});