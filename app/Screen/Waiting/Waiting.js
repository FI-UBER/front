//import SelectList from 'react-native-dropdown-select-list' //to_do agregar a readme
import {Text, View, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import { Image, Alert} from 'react-native';
import React, { useEffect, useState}  from 'react';
import { useFocusEffect } from '@react-navigation/native';
import WAITING from '../../assets/waiting.gif'
import {currentSession} from '../../context'
import {Button} from 'react-native-paper'
import {alerts, AsyncAlert} from '../../components/Alert'
import { search_trip, accept_driver, client_has_a_driver } from '../../components/trip_api_endpoint';
import {schedulePushNotification} from '../../components/Noficationfunctions';
import { async } from '@firebase/util';
var bool= false;
var buclefunction=null;


function Waiting({navigation}) {
   const context = currentSession();
   const [msg,setMsg] = useState("")

  const NoLoop = () => {
    clearInterval(buclefunction)
    buclefunction = null;
    bool = false;
    if (context.passenger) {
      setMsg("Buscando Choferes...")
    }
    else{
      setMsg("Buscando Pasajeros...")
    }
  }

  const bucle1 =()=>{
    console.log("bucle cliente inicio");
    buclefunction = null;
    bool=true;
    
    if(buclefunction==null && (bool)){
      //Busco al entrar, cada 5 sec
      buclefunction = setInterval(Client_with_driver,5000);
      
     }
  }


  const bucle =()=>{
    console.log("bucle driver inicio");
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
    context.dropTrip_id();
    if(context.passenger){
      console.log("Trip",context.trip_id ,"cancelado")
    }
    else{
      console.log("Busqueda de viaje cancelado")
    }
    navigation.navigate('Home Login')
  }


const Client_with_driver =async()=>{
  try {
    console.log(context.getTrip_id())
    const {driver_status} = await client_has_a_driver(context.getTrip_id());
    NoLoop();
    console.log(driver_status)
    if (driver_status == "driver_found"){
      setMsg("Choferes Encontrado")
      alerts("Exito","Tu viaje ya tiene conductor")
    }
    else{
      alerts("No Exito","Tu viaje aun no tiene conductor")
      setMsg("Buscando Choferes...")
      bucle1()
    }
    
  } catch (error) {
    console.log(error.message);
    setMsg(error.message);
  }
}

const Driver_Accepter = async(trip_id) => {
  try {
    const { status }  = await accept_driver(trip_id, context.uid);
    context.setTrip_id(trip_id);
    setMsg("Chofer Aceptado");
    console.log("status:",status);
    //salir
    navigation.navigate("Route Map");
  
  } catch (error) {
    console.log(error.message);
    setMsg(error.message);
  }

  
}

 const Driver_Search= async()=>{
  console.log("Busco cada 5 sec, soy chofer...");
  try {
      const { price, trip_id }  = await search_trip();
      setMsg("Viaje encontrado");
      console.log("viaje con precio:",price,"y trip_id:", trip_id);
      const text ='precio :'+price+'\n'+'trip_id: '+trip_id+'\n';
      NoLoop();
      schedulePushNotification("Viaje Encontrado", text, "Search Screen")
      await AsyncAlert("Viaje encontrado",text)
      .then(async(response)=>{  
        if (response == true) {
          Driver_Accepter(trip_id);
        }
        else{
          bucle()
          setMsg("Buscando otro viaje");
        }
      })
      
  } catch (error) {
      console.log(error.message);
      setMsg(error.message);
  }

}

//Hook de Effect para buscar viajes o choferes
 useFocusEffect(   
  React.useCallback(() => { 
    if (context.passenger) {
      setMsg("Buscando Choferes...")
      bucle1();
   }
   else{
      setMsg("Buscando Pasajeros...")
      bucle();
    }
    return () => {
      //Solo busco en 1er plano
      NoLoop();
   //   alert('Screen was unfocused');
    };
  }, [])
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
              //disabled={isDisabled}
              >Cancelar Busqueda
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
    },
    text: {
        
        fontSize: 30,
        fontWeight: 'bold',
        margin: 20,
    }
})

export default Waiting;