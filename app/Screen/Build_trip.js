import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet,SafeAreaView, Image, Dimensions,Alert, ImageBackground,ScrollView } from 'react-native';
import {Button} from 'react-native-paper'
import {GOOGLE_API_KEYS, MAP} from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import FIFIUBA from '../assets/car1.gif'
import {alerts} from '../components/Alert'
import * as Location from 'expo-location';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE  } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useFocusEffect } from '@react-navigation/native';
import { currentSession } from '../context';
import {price_trip, create_trip} from "../components/trip_api_endpoint"
import {SaveCurrentTrip, getCurrentTrip_} from "../components/lastTrip"
import { deposit, walletBalance } from '../components/wallet_endpoint';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from '@firebase/util';
// import { ScrollView } from 'react-native-virtualized-view'


export default function Ejemplo ({navigation}) {
////////////////////////////////////////

const [profile,setprofile] = React.useState("");
const [bal,setbal] = React.useState("");
var CantPay = false
const [a, seta] = React.useState(false);

const getProfile = async () => {  
   const jsonValue = await AsyncStorage.getItem('userprofile');
   const userProfile =  JSON.parse(jsonValue);  
   if (userProfile !== null) {
      setprofile(userProfile);
  }
  console.log(userProfile)
  return userProfile;
}
const getBalanceUser_ = () => {
   getProfile().then(async(keyValue) => {
     await walletBalance(profile.WalletAdress).then((response) =>{
      console.log("balance: " + response)
       setbal(response.toFixed(8))
       })
     })
   }


const  EvalBalanceUser = async(res) => {
         CantPay = (Number(bal) <= Number(res/1000))
         console.log("user",CantPay)
         if (CantPay){
            //Number(balance) <= (price_/1000)){
               setis(true);
               setOIS(false);
               setDIS(false);
               setnext(false);
               setPrice(0)
               setDistance(0)
               setPriceReady(false)
               Alert.alert("Trip Canceled"
               ,"You don't have enough money in your wallet for the trip")
            }
            else {
               await build_trip()
            }
}

//////////////////////////////////////
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
      name:'',
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
        //getBalanceUser()
        
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
         getProfile().then((keyValue) => {
            //nothing
         });
         
   //      alert('Screen was focused');
         setFocus(true);
         setis(true);
         setOIS(false);
         setDIS(false);
         setnext(false);
         setPrice(0)
         setDistance(0)
         setPriceReady(false)
         //getBalanceUser()
         return () => {
         //   alert('Screen was unfocused');
            setFocus(false)
         };
      }, [])
      );
    
    const LatLngOrigin = (lat, long, _name) =>{
      setOrigin({...origin,latitude: lat, longitude: long, name: _name})
    }
    
      //Destino,
    const [destiny, setDestiny] = React.useState({
      //FIUBA
      latitude: null,
     // -34.617639,
      longitude: null,
     // -58.368056,
      name:'',
    });


   const LatLngDestiny = (lat, long, _name) =>{
      setDestiny({...destiny,latitude: lat, longitude: long, name: _name})
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
         //getBalanceUser(result)
       })   
   }

   const query_create_trip = async(price_)=>{
      await create_trip(context.uid, price_, origin.latitude, origin.longitude, destiny.latitude, destiny.longitude, origin.name, destiny.name).then((result)=>{
        trip_id_ = (result.trip_id);
        console.log(trip_id_);
        if (trip_id_ ==="User have other trips waiting or in progress"){
          alerts("Create Trip", "User: "+context.uid+" have other trips waiting or in progress");
          console.log(context.uid, "ya creo un trip.")
          trip_id_=null;
        }
        else{
          console.log("Esperando viaje, trip:", trip_id_);
        }
      })
    }

   const build_trip = async() => {
      await query_create_trip(price_).then(async ()=>{
           if (trip_id_ == null ){
             setis(true);
             setOIS(false);
             setDIS(false);
             setnext(false);
             setPrice(0)
             setDistance(0)
             setPriceReady(false)
             const current = await getCurrentTrip_()
             navigation.navigate("Searching",{
               id: current.id, Olat: current.Olat ,Olng: current.Olng,
               Dlat: current.Dlat, Dlng: current.Dlng, price: current.price
             })

           }
           else {
             SaveCurrentTrip(trip_id_, origin.latitude, origin.longitude,
                destiny.latitude, destiny.longitude, price_)
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
            {/* <ScrollView horizontal={true} style={{flex: 1, width: '100%', height: '100%'}}> */}
            <ImageBackground source={require("../assets/cache.png")} style={styles.image_} >
         <View style={styles.google}>
            <GooglePlacesAutocomplete
            horizontal ={true}
               placeholder="Trip Origin"
               query={{
                  key: GOOGLE_API_KEYS,
                  language: 'es'}}
               fetchDetails={true}
               onPress={(data, details = null) => {
                  //console.log(details.name); 
                  LatLngOrigin(details.geometry.location.lat, details.geometry.location.lng, details.name);
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
                  height:"60%",
                  marginLeft:20,
                  marginRight:20,
                  justifyContent:'center',
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
               horizontal ={true}
               placeholder="Trip Destination"
               query={{
               key: GOOGLE_API_KEYS,
               language: 'es'}}
               fetchDetails={true}
               onPress={(data, details = null) => {
                  //console.log(details.name)
                  LatLngDestiny(details.geometry.location.lat, details.geometry.location.lng, details.name);
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
                     justifyContent: 'center',
                     flex: 0,
                     width:"80%",
                     height:"60%",
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
         </ImageBackground>
         {/* </ScrollView> */}
         </React.Fragment>
      )            
   }

   function map(){
      return(
         <React.Fragment>
         <MapView style={styles.map}
               provider={PROVIDER_GOOGLE} 
               apikey={MAP}
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
                  apikey={GOOGLE_API_KEYS}
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
                    getBalanceUser_()
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
                           //VEo si tiene el dinero para el viaje
                           
                           EvalBalanceUser(price_)
  
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
            horizontal={false}
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

         {/* <ImageBackground source={require("../assets/cache.png")} style={styles.image_} > */}
         
         {
            is && type_data()
         }
         {/* </ImageBackground> */}
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
         //  backgroundColor:'blue',
       },
       google:{
         height: Dimensions.get('window').height/4.5,
         alignItems: 'center',
         //backgroundColor: 'red'
       },
       image:{
         marginRight:10,
         width: Dimensions.get('window').width/1.7,
         height: Dimensions.get('window').height/3.5,
         resizeMethod: 'resize',
       },
       image_:{
         width: Dimensions.get('window').width,
         height: Dimensions.get('window').height/2,
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