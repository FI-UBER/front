import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, StyleSheet,Dimensions, Alert, Button, TextInput, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from '@env'
import { useFocusEffect } from '@react-navigation/native';
import { currentSession } from '../context';
import price from "./service2"

export default function Map_Google({navigation}) {
  const context = currentSession();
  //const Nav = useNavigation();
  const [isFocused, setFocus] = React.useState(false)
  const [distance, setDistance] = React.useState(0)

  const [_position, setPos] = React.useState({
    //Casa Rosada como primer origen
    latitude: null, 
    longitude: null,
  });
  
  //Origen
  const [origin, setOrigin] = React.useState({
    //Casa Rosada como primer origen
    latitude: -34.60738448397424, 
    longitude: -58.37032071534236,
    name:null,
  });
  
  const LatLngOrigin = (lat, long) =>{
    setOrigin({...origin,latitude: lat, longitude: long})
  }
  
    //Destino,
  const [destiny, setDestiny] = React.useState({
    //FIUBA
    latitude: -34.617639,
    longitude: -58.368056,
    name:'FIUBA',
  });

  const LatLngDestiny = (lat, long) =>{
    setDestiny({...origin,latitude: lat, longitude: long})
  }

  const mapRef = React.createRef();

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



  //Hook
  useEffect(() => {
    (async () => {
      if (isFocused) {
        let {status}  = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
      }
      else{
        try {
          const location = await Location.getCurrentPositionAsync({});
          setPos({..._position,latitude: location.coords.latitude, longitude: location.coords.longitude});
          if (location.latitude === null && location.longitude === null) {
          //Alert.alert('Se debe poder localizar tu posicion. Enciende tu ubicacion');
            navigation.navigate("Home Login")
          }
        } catch (error) {
          Alert.alert('Se debe poder localizar tu posicion. Enciende tu ubicacion');
          navigation.navigate('Home Login')
        }
      }
    }
    }
    )();
  }, [isFocused]);

  //llamada al api de viajes para precio en service2
  const asasap = async()=>{
    const distance=41;
      try {
        console.log("price")
        //const response = await price(distance)
        Alert.alert("precio")
    } catch (e) {
        console.log(e.message)
    }

  }
  //Hook
  useFocusEffect(
    React.useCallback(() => {
   //   alert('Screen was focused');
      setFocus(true);
      return () => {
     //   alert('Screen was unfocused');
        setFocus(false)
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
            <Button
              style={{padding:50, position: 'relative'}}
              type="button" 
              title="Mi posicion como Origen"
              onPress= {MyPosition}>
            </Button>
            <View >
              { <Text >Origen</Text> }
            </View>
              <View style={ styles.google}>
              <GooglePlacesAutocomplete
                placeholder="Type a place"
                query={{
                  key: GOOGLE_API_KEY,
                  language: 'es'}}
                fetchDetails={true}
                onPress={(data, details = null) => {LatLngOrigin(details.geometry.location.lat, details.geometry.location.lng); console.log(details)}}
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
                  
                    marginLeft: 0,
                    marginRight: 0,
                    height: 45,
                    color: '#5d5d5d',
                    fontSize: 16,
                    borderWidth:1,
                    zIndex:999,
                    position: 'relative'
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                  container: {
                    flex: 0,
                    width:"70%",
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
                    position: 'absolute'
                  },
                }}
                />
              </View>
              <View>
              <Text >Destino </Text> 
              </View>
              <View style={styles.google}>
              <GooglePlacesAutocomplete
                placeholder="Type a place"
                query={{
                  key: GOOGLE_API_KEY,
                  language: 'es'}}
                fetchDetails={true}
                onPress={(data, details = null) => LatLngDestiny(details.geometry.location.lat, details.geometry.location.lng)}
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
                    marginLeft: 0,
                    marginRight: 0,
                    height: 45,
                    color: '#5d5d5d',
                    fontSize: 16,
                    borderWidth:1,
                    zIndex:999,
                    position: 'relative',
                  },
                  container: {
                    flex: 0,
                    width:"70%",
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
              <View>
                <Text>Distancia:{distance}</Text>
              </View>

              <MapView style={styles.map} 
              ref={mapRef}
              showsUserLocation = {true}
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
                coordinate={origin}
              >
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
                  strokeColor= 'black'
                  onStart={(params) => {
                  }}
                  onReady={result => {
                    setDistance(result.distance)
                    console.log("Distancia")
                    console.log(result.distance)
                  }}>
                </MapViewDirections>
            </MapView>
            <View>
              <Button
                style={{padding:20}}
                type="button" 
                title="Precio del viaje"
                onPress= {asasap}>
              </Button>
            </View> 
    </SafeAreaView>
    );




  function MyPosition() {
    console.log('My Position');
    console.log(_position.latitude);
    console.log(_position.longitude);
    setOrigin({...origin,latitude: _position.latitude, longitude: _position.longitude});
    fitMapToOriginDestiny();
    }
  }




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height)/4,
  },
  input: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height)/15,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  google:{
    height: '20%'
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
}
});