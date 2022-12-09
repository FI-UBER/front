import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet,SafeAreaView, StatusBar, ScrollView,Image, Dimensions } from 'react-native';
import {Button} from 'react-native-paper'
import {GOOGLE_API_KEY} from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import FIFIUBA from '../assets/car1.gif'
import {alerts} from '../components/Alert'
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useFocusEffect } from '@react-navigation/native';
import { currentSession } from '../context';
import {price_trip, create_trip} from "../components/trip_api_endpoint"
import { deposit } from '../components/wallet_endpoint';

export default function Ejemplo ({navigation}) {
   var trip_id_=null;
   const context = currentSession()
   const mapRef = React.createRef();
   //states de estados de pantallas
   //datos
   const [is, setis]= useState(true)
   const [originIsSet, setOIS ]= useState(false);
   const [destinyIsSet, setDIS ]= useState(false)
   //mapa
   const [next, setnext ]= useState(false)

   const [price_, setPrice] = useState(0)
   const [distance, setDistance] = React.useState(0)

   //puedo calcular precio
   const [priceready, setPriceReady] = useState(false)
   
   //si se esta en la pantalla
   const [isFocused, setFocus] = React.useState(false)
    
    //Origen
    const [origin, setOrigin] = React.useState({
      //Casa Rosada como primer origen
      latitude: null,
      //-34.60738448397424, 
      longitude: null,
      // -58.37032071534236,
      name:null,
    });

   //  useEffect(() => {
   //    if(originIsSet==true && destinyIsSet == true) {
   //       console.log("Next")
   //      setnext(true)
   //      setis(false)
        
   //    }
   //  }, [originIsSet,destinyIsSet]);

    const confirm_trip = () => {
      if(originIsSet==true && destinyIsSet == true) {
         console.log("Next")
        setnext(true)
        setis(false)
        
      }
    }

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
         //  console.log(location.coords.latitude, location.coords.longitude)
            setOrigin({...origin,latitude: location.coords.latitude, longitude: location.coords.longitude});
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
         setis(true);
         setOIS(false);
         setDIS(false);
         setnext(false);
         setPrice(0)
         setDistance(0)
         setPriceReady(false)
         return () => {
         //   alert('Screen was unfocused');
            setFocus(false)
         };
      }, [])
      );
    
    const LatLngOrigin = (lat, long) =>{
      setOrigin({...origin,latitude: lat, longitude: long})
    }
    
      //Destino,
    const [destiny, setDestiny] = React.useState({
      //FIUBA
      latitude: null,
     // -34.617639,
      longitude: null,
     // -58.368056,
      name:'FIUBA',
    });


   const LatLngDestiny = (lat, long) =>{
      setDestiny({...destiny,latitude: lat, longitude: long})
    }

//llamadas a api de viajes
//---------------------------------------------
    const GetPrice = async()=>{
      const { price }  = await price_trip(distance);
      return price;
   }

   const calculate_price = ()=>{
      GetPrice().then(async(result) => {
         console.log("Precio del viaje", result)
         setPrice(result.toFixed(2))
       })   
   }

   const query_create_trip = async(price_)=>{
      await create_trip(context.uid, price_, origin.latitude, origin.longitude, destiny.latitude, destiny.longitude).then((result)=>{
        trip_id_ = (result.trip_id).toString();
        console.log(trip_id_);
        if (trip_id_ ==="An error occurred"){
          alerts("Trip Creado", "Usuario "+context.uid+" ya tiene un viaje en espera.");
          console.log(context.uid, "ya creo un trip.")
          trip_id_=null;
        }
        else{
          console.log("Esperando viaje, trip:", trip_id_);
        }
        
          
      })
      
    }

   const build_trip = async() => {
      await query_create_trip(price_).then(()=>{
           if (trip_id_ === null){
             setis(true);
             setOIS(false);
             setDIS(false);
             setnext(false);
             setPrice(0)
             setDistance(0)
             setPriceReady(false)

           }
           else {
             navigation.navigate("Searching",{
               id: trip_id_,Olat: origin.latitude ,Olng: origin.longitude,
                Dlat: destiny.latitude, Dlng: destiny.longitude, price: price_})
           }
         })  
   }
 //--------------------------------------------------------------- 

      function type_data() {
      return(
         <React.Fragment >
         <View style={styles.google}>
            <GooglePlacesAutocomplete
               placeholder="Trip Origin"
               query={{
                  key: GOOGLE_API_KEY,
                  language: 'es'}}
               fetchDetails={true}
               onPress={(data, details = null) => {
                  LatLngOrigin(details.geometry.location.lat, details.geometry.location.lng);
                  setOIS(true);
               }}
               onFail={error => console.log(error)}
               onNotFound={() => console.log('no results')}
               styles={{
               textInputContainer:{
                  borderTopWidth: 0,
                  borderBottomWidth:0,
                  zIndex:999,
                  width:'100%',
               },
               textInput: {
                 // alignItems: 'center',
                  marginLeft: 0,
                  marginRight: 0,
                  height: 45,
                  color: '#5d5d5d',
                  fontSize: 16,
                  borderWidth:1,
                  zIndex:999,
                  position: 'relative',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  borderTopRightRadius:20,
                  borderTopLeftRadius: 20,
               },
               container: {
                  flex: 0,
                  width:"80%",
                  height:"100%",
                  marginLeft:20,
                  marginRight:20,
                  justifyContent:'center'
               },
               description: {
                  color: '#000',
                  fontSize: 16,

               },
               predefinedPlacesDescription: {
                  color: '#3caf50',
                  },
               }
            }
            />
         </View>
         <View style={ styles.google}>
            <GooglePlacesAutocomplete
               placeholder="Trip Destination"
               query={{
               key: GOOGLE_API_KEY,
               language: 'es'}}
               fetchDetails={true}
               onPress={(data, details = null) => {
                  LatLngDestiny(details.geometry.location.lat, details.geometry.location.lng);
                  setDIS(true);
               }}
               onFail={error => console.log(error)}
               onNotFound={() => console.log('no results')}
               onSubmitEditing={true}
            
               styles={{
                  textInputContainer:{
                     borderTopWidth: 0,
                     borderBottomWidth:0,
                     zIndex:999,
                     width:'100%',
                  },
                  textInput: {
                     height: 45,
                     color: '#5d5d5d',
                     fontSize: 16,
                     borderWidth:1,
                     zIndex:999,
                     position: 'relative',
                     borderBottomLeftRadius: 20,
                     borderBottomRightRadius: 20,
                     borderTopRightRadius:20,
                     borderTopLeftRadius: 20,
                  },
                  container: {
                     justifyContent: 'flex-start',
                     flex: 0,
                     width:"80%",
                     height:"100%",
                     marginLeft:20,
                     marginRight:20,
                  },
                  description: {
                     color: '#000',
                     fontSize: 16,
   
                  },
                  predefinedPlacesDescription: {
                     color: '#3caf50',
                     },
               }}
               />
         </View>
         <View style={styles.button_container}>
            <Button
               style ={styles.button}
               icon="car-sports"  
               mode={"contained"}
               buttonColor="green"
               onPress= {async()=> {
                  confirm_trip()
                  // await build_trip()
               }} 
               >Confirm
            </Button>
         </View>
         <View style={styles.button_container}>
            <Button
               style ={styles.button}
               icon="car-sports"  
               mode={"contained"}
               buttonColor="green"
               onPress= {async()=> {
                 await deposit(0.001)
                  // await build_trip()
               }} 
               >deposit
            </Button>
         </View>


         </React.Fragment>
      )            
   }

   function map(){
      return(
         <React.Fragment>
         <MapView style={styles.map} 
              ref={mapRef}
             //t showsUserLocation = {true}
              followsUserLocation={true}
              showsMyLocationButton={true}
              initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                  }}
        >
              <Marker
              //Pin en origen 
                title='Origen'
                coordinate={origin}>
              </Marker>
              <Marker
                //Pin en destino
                  title='Destino'
                  coordinate={destiny}>
              </Marker>
                <MapViewDirections
                //API KEY Requerido
                  origin={origin}
                  destination={destiny}
                  apikey={GOOGLE_API_KEY}
                  strokeWidht={7}
                  str
                  strokeColor= 'black'
                  onStart={(params) => {
                  }}
                  onReady={result => {
                   setDistance(result.distance)
                   
                  // calculate_price()
                   setPriceReady(true)
                    console.log("Distancia")
                    console.log(result.distance)
                    fitMapToOriginDestiny()
                  }}>
                  
                </MapViewDirections>
            </MapView>
               <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                  <View style={styles.text_p}>
                     <Text style={styles.text_d}>
                        Price: ${price_} 
                     </Text>
                  </View>
                  <View style={styles.button_container}>
                     <Button
                        style ={styles.button}
                        icon="car-sports"  
                        mode={"contained"}
                        buttonColor="green"
                        onPress= {async()=> {
                           await build_trip()
                           //   navigation.navigate("Search Screen")
                        }} 
                        >Search Driver
                     </Button>
                  </View>
               </View>     

            </React.Fragment>
      )
   }

   const coords = [origin,destiny];
 
   //Ajusta vista del mapa a origen/destino
 function fitMapToOriginDestiny() {
    
   mapRef.current.fitToCoordinates(coords, {
       edgePadding: {
         top: 20,
         right: 20,
         bottom: 20,
         left: 20,
       },
     });
   }

    return (
      <SafeAreaView style={styles.container}>
         <ScrollView
      //horizontal={true}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps='always'
            contentContainerStyle={{ flexGrow: 1 }}
            style={{
            //  marginTop:150
            }}>
         
         <View style={{
            alignItems:'center',
          //  backgroundColor:'red',
            height:Dimensions.get('window').height/3.5
            }}>
            <Image source={FIFIUBA} style={styles.image} />
         </View>
         {
            is && type_data()
         }

         {
             next && map() 
         }

         {
            priceready && calculate_price() 
         }
         </ScrollView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex:1 ,
      backgroundColor: 'white',
  //    paddingTop: StatusBar.currentHeight,
 //     alignItems: 'center',
      justifyContent: 'center',
    },
       button: {
           width:"70%",
           marginTop:0,
       },
       button_container: {
           flex:1,  
           alignItems: 'center',
           alignContent: 'center',
           justifyContent: 'center',
        //   backgroundColor:'blue',
       },
       google:{
         height: Dimensions.get('window').height/4,
         alignItems: 'center',
     //    backgroundColor: 'red',
       },
       image:{
         marginRight:10,
         width: Dimensions.get('window').width/1.7,
         height: Dimensions.get('window').height/3.5,
         resizeMethod: 'resize',
       },
       text_d:{
         fontSize:20,
         alignItems: 'center',
         alignContent: 'center',
         justifyContent: 'center',
       },
       text_p:{
         width:"50%",
         fontSize:25,
         alignItems: 'center',
         alignContent:'flex-end',
         justifyContent: 'center',
     //    backgroundColor:'red'
       },  
       map: {
         width: Dimensions.get('window').width,
         height: (Dimensions.get('window').height)/2.5,
       },
 });