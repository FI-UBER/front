import React,{useState, useEffect} from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import {Button} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
import {currentSession} from '../../context'
import { accept_driver } from '../../components/trip_api_endpoint';
import FIFIUBA from '../../assets/car1.gif'
import * as Location from 'expo-location';

export default function Trip_Found ({route, navigation})  {

   //Para recibir parametros
  // const route = useRoute();
   
   const context = currentSession();
   const [trip_id_,setid] = useState("");
   const [price_,setprice] = useState("");
   const [O_lat_,setOlat] = useState("");
   const [O_lng_,setOlng] = useState("");
   const [D_lat_,setDlat] = useState("");
   const [D_lng_,setDlng] = useState("");

   const [_position, setPos] = React.useState({
      //Casa Rosada como primer origen
      latitude: 0, 
      longitude: 0,
    });

   async function MyPos ()  {
      try {
        const location = await Location.getCurrentPositionAsync({});
      //  console.log(location.coords.latitude, location.coords.longitude)
        setPos({..._position,latitude: location.coords.latitude, longitude: location.coords.longitude});
        if (location.latitude === null && location.longitude === null) {
          navigation.navigate("Home")
        }
      } catch (error) {
        console.log('Se debe poder localizar tu posicion. Enciende tu ubicacion');
      }
    }

   useFocusEffect(   
      React.useCallback(() => {
      async function updatePos(){
      // alert('Screen was focused');
         await MyPos() 
      }
      updatePos();
      console.log(route.params)
      var {id, Olat, Olng, Dlat, Dlng, price}= route.params
      setid(id)
      //var {price} = route.params
      setprice(price)
      setOlat(Olat)
      setOlng(Olng)
      setDlat(Dlat)
      setDlng(Dlng)
      return () => {
      //   alert('Screen was unfocused');
      };
      }, [route.params])
   );

   const Driver_Accepter = async(trip_id) => {
      try {
        const { status }  = await accept_driver(trip_id, context.uid, _position.latitude, _position.longitude );
        console.log("status:",status);
      //   setid("");
      //   setprice("")
      //   setOlat("")
      //   setOlng("")
      //   setDlat("")
      //   setDlng("")
        //salir
       // console.log( 'id:', trip_id_, 'Olat:',O_lat_,'Olng:',O_lng_, 'Dlat:',D_lat_, 'Dlng:',D_lng_);
        navigation.navigate("Route Map", 
        {id: trip_id_, Olat:O_lat_, Olng:O_lng_, Dlat: D_lat_, Dlng: D_lng_, price: price_ , name: 'Custom profile header' })
      } catch (error) {
        console.log(error.message);
 //       setMsg(error.message);
      }
    }

   return(
      <SafeAreaView style={styles.container}>
         <View style={{
            alignItems:'center',
          //  backgroundColor:'red',
            height:Dimensions.get('window').height/3.5
            }}>
            <Image source={FIFIUBA} style={styles.image} />
         </View>
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.text}>Foundit Trip whit price: {price_}</Text>
         </View>
         <View style={styles.button_container}>
         <Button
               style ={styles.button}
               icon="car-sports"  
               mode={"contained"}
               buttonColor="green"
               onPress= {async()=> {
                  await Driver_Accepter(trip_id_)

                  navigation.navigate("Route Map")
               }} 
               >Accept Trip
            </Button>
            <Button
               style ={styles.button}
               icon="car-sports"  
               mode={"contained"}
               buttonColor="red"
               onPress= {()=> {
                  setid("");
                  setprice("")
                  setOlat("")
                  setOlng("")
                  setDlat("")
                  setDlng("")
                  navigation.navigate("Searching",{idAvoid: trip_id_})
               }} 
               >Decline Trip and Search again
            </Button>
         </View>
      </SafeAreaView>
   )
};

const styles = StyleSheet.create({
   container: {
      flex:1 ,
      backgroundColor: 'white',
      justifyContent: 'center',
    },
       button: {
           width:"70%",
           margin:30,
       },
       button_container: {
           flex:2,  
           alignItems: 'center',
           alignContent: 'center',
           justifyContent:'flex-start',
      //     backgroundColor:'blue',
       },
       text: {
         fontSize: Dimensions.get('window').fontSize,
         fontWeight: 'bold',
         margin: 20,
     },
     image:{
       marginRight:10,
       width: Dimensions.get('window').width/1.7,
       height: Dimensions.get('window').height/3.5,
       resizeMethod: 'resize',
     },
})




