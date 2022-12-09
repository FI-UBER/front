import {Text, View, StyleSheet, Dimensions,SafeAreaView,Image} from 'react-native';
import React,{useEffect, useState} from 'react';
import {Button} from 'react-native-paper'
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from '@env'
import * as Location from 'expo-location';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';
import {update_driver_pos, get_driver_pos, update_status, get_status} from '../../components/trip_api_endpoint'
import {currentSession} from '../../context'
import {schedulePushNotification} from '../../components/Noficationfunctions';
import {pay, deposit} from '../../components/wallet_endpoint'


let lat_r= [-34.487145, -34.487913, -34.488681, -34.489459, -34.490090, -34.490784, -34.491646, -34.492488, -34.492908, -34.493434]
let lng_r =[-58.712741, -58.712027, -58.711516, -58.710904, -58.710406, -58.709883, -58.709182, -58.708646, -58.707612, -58.706566]

let trip_lat = [-34.493799, -34.494036, -34.492192, -34.492073, -34.491151, -34.490943, -34.491657, -34.492802,
   -34.494097, -34.495473, -34.495985, -34.496673, -34.497661, -34.498536, -34.499299, -34.499630 ]
let trip_lng = [-58.705893, -58.704630, -58.702663, -58.702411, -58.701021, -58.699253, -58.698315, -58.697449,
   -58.696297, -58.695311, -58.694537, -58.694142, -58.693293, -58.692549, -58.691957, -58.691396 ]

var bool= false;
var buclefunction=null;


function Route_Map({route, navigation}) {
  const context = currentSession();

   const mapRef = React.createRef();
  // const route = useRoute();
   const [update_,setUpdate] = useState(true);
   const [id_,setId] = useState('');
   const [Msg_,setMsg] = useState('');
   const[ anybutton, setany] = useState(false);
   const[ inProgress, setIn] = useState(false);
   const [price_, setPrice] = useState(0);
   var Dopayment = false

   useEffect(() => {
    console.log(_position)
    
  }, [_position, setPos, origin, setOrigin,destiny, setDestiny]);

   //posicion driver
   const [_position, setPos] = React.useState({
    latitude: 0, 
    longitude: 0,
  });

   //Origen
  const [origin, setOrigin] = React.useState({
    //Casa Rosada como primer origen
    latitude: -34.60738448397424, 
    longitude: -58.37032071534236,
  });
  
    //Destino,
  const [destiny, setDestiny] = React.useState({
    //FIUBA
    latitude: -34.617639,
    longitude: -58.368056,
  });

    //Para obtener parametros de long y lat del viaje
    useFocusEffect(   
      React.useCallback(() => {
        async function updatePos(){
          // alert('Screen was focused');
             await MyPos() 
          }
        async function asdf(){
          // alert('Screen was focused');
          const {position_lat, position_long} =await get_driver_pos(id_);
         // console.log("posicion del driver para pasajero:",position_lat, position_long)
          setPos({..._position,latitude: position_lat, longitude: position_long});
          }

      if (update_ == true){
        const {id, Olat, Olng, Dlat, Dlng, price}= route?.params || {};
        setId(id)
        setOrigin({...origin,latitude: Olat, longitude: Olng});
        setDestiny({...destiny,latitude: Dlat, longitude: Dlng});  
        setUpdate(false)
        if (context.passenger){
          setPrice(price)
          console.log("precio pasajero:",price)
          asdf();
          setMsg("Wait in your position for your driver to approach")
          
        }
        else {
          setPrice(price)
          console.log("precio driver:",price)
          setany(true)
          updatePos();
          setMsg("Go to the passenger's location")
        }

      }
      return () => {
        //   alert('Screen was unfocused');
        setUpdate(true)
        };
        }, [route])
     );
//Pedir posicion del conductor por parte del pasajero------------------------
// function postition_driver(i) {
//   setTimeout(async function() { 
//     const {position_lat, position_long} =await get_driver_pos(id_);
//   //  console.log("posicion del driver para pasajero:",position_lat, position_long)
//     setPos({..._position,latitude: position_lat, longitude: position_long});

//   }, 5000*i);
// } 

// function update_driver_pos_to_client(){
//   for (var i = 0; i < lat_r.length; ++i)
//     postition_driver(i);
// }


const loopPassenger = (id_) => {
  buclefunction = null;
  bool=true;
  
  if(buclefunction==null && (bool)){
    //Busco al entrar, cada 5 sec
    buclefunction = setInterval(function() {pos(id_)}, 5000);
   }
}
const pos = async(id_) => {
  const {trip_status} = await get_status(id_)
//  console.log("status: ",trip_status)
  if (trip_status == "running"){
        //Aca pagar el viaje
        if (!Dopayment){
          Dopayment = true;
          console.log("Se deposito:",price_/1000)
          await deposit(price_/1000)
          schedulePushNotification("Payment Made", "The cost of the trip has been debited from your Wallet", "Searching")
        }

        setMsg("Trip in progress")
  }
  const {position_lat, position_long} =await get_driver_pos(id_);
  NoLoop();
  if (trip_status == "complete"){
    Dopayment=false;
    setUpdate(true)
    setId('')
    setMsg('')
    setany(false)
    setIn(falseResult)
    setPrice(0)
    navigation.navigate("Home")  
  }
 // console.log("posicion del driver para pasajero:",position_lat, position_long)
  setPos({..._position,latitude: position_lat, longitude: position_long});
  loopPassenger(id_)
}

const NoLoop = () => {
  clearInterval(buclefunction)
  buclefunction = null;
  bool = false;
}


//Viaje de juguete --------------------------------------------------------

    function trayecto(lat, lng){
      for (var i = 0; i < lat.length; ++i)
        doSetTimeout(i,lat[i], lng[i]);
    }

    function doSetTimeout(i,lat,lng) {
      setTimeout(async function() { 
       // console.log(lat, lng, id_);
        setPos({..._position,latitude: lat, longitude: lng});
        const updated =await update_driver_pos(id_, lat,lng );
        //console.log(updated)


      }, 5000*i);
    }
//----------------------------------------------------------------------------------
//
//Obtener mi posicion
async function MyPos ()  {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setPos({..._position,latitude: location.coords.latitude, longitude: location.coords.longitude});
      if (location.latitude === null && location.longitude === null) {
        navigation.navigate("Home")
      }
    } catch (error) {
      console.log('Se debe poder localizar tu posicion. Enciende tu ubicacion');
    }
  }

  //Centrar mapa----------------------------
  const coords = [origin,destiny];
 
  //Ajusta vista del mapa a origen/destino
function fitMapToOriginDestiny() {
  //console.log(coords)
   
  mapRef.current.fitToCoordinates(coords, {
      edgePadding: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
      },
    });
  }
//-----------------------------------------
//----------------------------------------
function button_start ()  {
  return (
  <View style={styles.button_container}>
    <Button  
        style ={styles.button}
        labelStyle={{
          fontSize:Dimensions.get('window').height* 0.02,
        }}
        mode={"contained"}
        onPress={() => {
          setany(false);
          setIn(true);
          init_trip(id_)
        }} 
        >Start Trip
  </Button>
</View>
  )
}
async function init_trip(id){
  const {trip_updated_to} = await update_status(id);
  setMsg("Trip in progress")
 // console.log(trip_updated_to)
  trayecto(trip_lat,trip_lng)
}


function button_finish ()  {
  return (
  <View style={styles.button_container}>
    <Button  
        style ={styles.button}
        labelStyle={{
          fontSize:Dimensions.get('window').height* 0.02,
        }}
        mode={"contained"}
        onPress={async() => {
          console.log("Se pago:", price_/1000)
          await pay(price_/1000)
          schedulePushNotification("Payment Receive", "The cost of the trip has been sending to your Wallet", "Searching")
          navigation.navigate("Home")
        }} 
        >Finish Trip
  </Button>
</View>
  )
}


//--------------------------------------------------------------------------------
    return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center' 
     // backgroundColor:'red'
       }}>
        <Text style={styles.text}>{Msg_} </Text>
        </View>
        <View style={{flex:4}}>
         <MapView style={styles.map} 
              ref={mapRef}
            //  showsUserLocation = {true}
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
              //Pin en posicion mia 
                title='Yo'
                coordinate={_position}                
              >
                <Fontisto name="car" size={24} color="black" />
              </Marker>
              <Marker
              //Pin en origen viaje
                title='Origen'
                coordinate={origin}
              >
              </Marker>
              <Marker
                //Pin en destino viaje
                  title='Destino'
                  coordinate={destiny}>
              </Marker>
                <MapViewDirections
                //API KEY Requerido
                  origin={origin}
                  destination={destiny}
                  apikey={GOOGLE_API_KEY}
                  strokeWidht={10}
                  strokeColor= 'black'
                  mode='DRIVING'
                  onStart={(params) => {
                  }}
                  onReady={result => {
                    
                    if (context.passenger){
                      fitMapToOriginDestiny()
||                    loopPassenger(id_)
                    }
                    else {
                  //    fitMapToOriginDestiny()
                      trayecto(lat_r, lng_r)
                    }
                  }}>
                </MapViewDirections>
            </MapView>
            </View>
             {
              anybutton && button_start()
             }
             {
              inProgress && button_finish()
             }
             
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    //  alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        fontSize: Dimensions.get('window').fontSize,
        fontWeight: 'bold',
        margin: 5,
    },
    map: {
      width: Dimensions.get('window').width,
      height: (Dimensions.get('window').height)/1,
    },
    button_container: {
      flex:1,  
      alignItems: 'center',
     // alignContent: 'center',
      justifyContent:'center',
    //  backgroundColor:'blue',
  },
  button: {
    width:"50%",
    height:"30%",
    margin:30,
},
})

export default Route_Map;