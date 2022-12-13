import React,{useEffect} from 'react';
import { View, StyleSheet,ScrollView, SafeAreaView,Image,Dimensions} from 'react-native';
import { Button } from 'react-native-paper';
import FIFIUBA from '../assets/car1.gif'
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import {alerts} from '../components/Alert'
import { deposit } from '../components/wallet_endpoint';

function Home_Driver({navigation}){

      //si se esta en la pantalla
      const [isFocused, setFocus] = React.useState(false)

      //Hook
      useEffect(() => {
         (async () => {
         if (isFocused) {
            let {status}  = await Location.requestForegroundPermissionsAsync();
         if (status !== 'granted') {
            alerts("Error",'Permission to access location was denied');
         }
         else{
            try {
               const location = await Location.getCurrentPositionAsync({});
               if (location.latitude === null && location.longitude === null) {
               navigation.navigate("Login")
               }
            } catch (error) {
               alerts("Importante",'Se debe poder localizar tu posicion. Enciende tu ubicacion');
               navigation.navigate('Login')
            }
         }
         }
   
         //
         }
         )();
      }, [isFocused]);

   //Hook
   useFocusEffect(
      React.useCallback(() => {
   //      alert('Screen was focused');
         setFocus(true);
         return () => {
         //   alert('Screen was unfocused');
            setFocus(false)
         };
      }, [])
      );


    return (
      <SafeAreaView style={styles.container}>

            <View style={{
                  alignItems:'center',
                  height:Dimensions.get('window').height/3,
                  flex: 1,
                 // backgroundColor:'pink',
               }}>
               <Image source={FIFIUBA} style={styles.image} />
            </View>
           <View style={styles.button_container}> 
               <Button
                  style ={styles.button}
                  icon="car-sports"  
                  mode={"contained"}
                  buttonColor="green"
                  onPress= {()=> {navigation.navigate("Searching", {idAvoid: -1}) }} 
                  >Search trip
               </Button>
            </View>
            {/* <View style={styles.button_container}> 
               <Button
                  style ={styles.button}
                  icon="car-sports"  
                  mode={"contained"}
                  onPress= {()=> {deposit(0.01) }} 
                  >deposit
               </Button>
            </View> */}

      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
   container: {
     flex:1 ,
     backgroundColor: 'white',
     justifyContent: 'center',
  //   backgroundColor:'red'
   },

   image:{
      width: Dimensions.get('window').width/1.6,
      height: Dimensions.get('window').height/3.3,
      resizeMethod: 'resize',
     },
     button: {
      width:"40%",
      marginTop:"10%",
  },
      button_container: {
         marginTop: Dimensions.get('window').height/5,
         flex: 2,
         //backgroundColor:'red', 
         alignItems: 'center',
         justifyContent: 'flex-start',
      },

});


export default Home_Driver;
