//import SelectList from 'react-native-dropdown-select-list' //to_do agregar a readme
import {Text, View, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import { Image, Alert} from 'react-native';
import React, { useEffect, useState}  from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import WAITING from '../../assets/waiting.gif'
import {currentSession} from '../../context'
import {Button} from 'react-native-paper'
import { deposit } from '../../components/wallet_endpoint';
import { search_trip, accept_driver, client_has_a_driver, cancelTrip } from '../../components/trip_api_endpoint';
import {schedulePushNotification} from '../../components/Noficationfunctions';
var bool= false;
var buclefunction=null;

function Waiting({navigation}) {
   const context = currentSession();
   const [msg,setMsg] = useState("")
   const [id_,setid] = useState("");
   var Olat_, Olng_, Dlat_, Dlng_, price_;
   var tripAvoid;

   
   //Para recibir parametros
   const route = useRoute();

  const NoLoop = () => {
    clearInterval(buclefunction)
    buclefunction = null;
    bool = false;
    if (context.passenger) {
      setMsg("Searching Driver...")
    }
    else{
      setMsg("Searching Client...")
    }
  }

  const loopPassenger = (id_trip) => {
    buclefunction = null;
    bool=true;
    
    if(buclefunction==null && (bool)){
      //Busco al entrar, cada 5 sec
      buclefunction = setInterval(function() {Client_with_driver(id_trip)}, 5000);
     
     }
  }

  const loopDriver =()=>{
    buclefunction = null;
    bool=true;
    
    if(buclefunction==null && (bool)){
      //Busco al entrar, cada 5 sec
      buclefunction = setInterval(Driver_Search,5000);
      
     }
  }

  const cancelSearch = () => {
    //no busco en loop 
    NoLoop();
    //quito id o cancelo busqueda
    
    if(context.passenger){
      console.log("Trip",id_ ,"cancelado")
      cancelTrip(id_)
      
    }
    else{
      console.log("Busqueda de viaje cancelado")
    }
    
   navigation.navigate('Home')
  }

const Client_with_driver =async(id_trip)=>{
  try {
    const {driver_status} = await client_has_a_driver(id_trip);
    NoLoop();
    console.log(driver_status)
    console.log(price_)
    if (driver_status == "driver_found"){
      schedulePushNotification("Driver found", "Your trip has already found a driver and he is heading to your position.", "Searching")
      setMsg("Driver found")
      //alerts("Success","Your trip has already found a driver")
       navigation.navigate("Route Map", 
       {id: id_trip, Olat:Olat_, Olng:Olng_, Dlat: Dlat_, Dlng: Dlng_, price: price_})
    }
    else{
      //alerts("No Exito","Tu viaje aun no tiene conductor")
      setMsg("Searching Driver...")
      loopPassenger(id_trip)
    }
    
  } catch (error) {
    console.log(error.message);
    setMsg(error.message);
  }
}

 const Driver_Search= async()=>{
  console.log("Busco cada 5 sec, soy chofer...");
  try {
      //console.log(tripAvoid)
      const { trip_price, trip_id,lat, long, dest_lat, dest_long, status }  = await search_trip(tripAvoid);
      NoLoop();
      if (status == "Failed: No trips available to do"){
        setMsg("Searching Client...")
        loopDriver()
      }
      else{
        setMsg("Foundit trip");
        console.log("viaje con precio:",trip_price,"y trip_id:", trip_id);
        const text ='Price of the trip :'+trip_price+'\n';
        
        schedulePushNotification("Foundit trip", text, "Route Map")
        navigation.navigate("Trip_Found",{
          id: trip_id, price: trip_price, Olat:lat, Olng:long, Dlat: dest_lat, Dlng: dest_long})
      }
  } catch (error) {
      console.log(error.message);
      setMsg(error.message);
  }
}

//Hook de Effect para buscar viajes o choferes
 useFocusEffect(   
  React.useCallback(() => {

    if (context.passenger) {    
      var {id, Olat, Olng, Dlat, Dlng, price}= route.params
      Olat_=Olat
      Olng_=Olng
      Dlat_=Dlat
      Dlng_=Dlng
      price_ = price
      setid(id)
      setMsg("Searching Driver...")
      loopPassenger(id)
    }
    else{
      var {idAvoid}= route.params
      tripAvoid = idAvoid
      setMsg("Searching Client...")
      loopDriver();
    }
    return () => {
      //Solo busco en 1er plano
      NoLoop();
    //   alert('Screen was unfocused');
    };
  }, [route.params])
);


  return (
    <SafeAreaView style={styles.container}>
         <View>
            <Image source={WAITING} style={{ width: 300, height: 300 }} />
         </View>
        <Text style={styles.text}> {msg} </Text>
         <View>
            <Button  
              mode={"contained"} 
              onPress= {cancelSearch}
              buttonColor="red" 
              >Cancel Search
            </Button>
         </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: 'center',
      justifyContent: 'center',
      horizontalAlign: 'center',
    },
    text: {
        
        fontSize: 30,
        fontWeight: 'bold',
        margin: 20,
    }
})

export default Waiting;