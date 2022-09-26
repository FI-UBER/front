import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,Dimensions, Alert, Button, TextInput, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function Map_Google() {
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
    latitude: -34.61032599547549,
    longitude: -58.36988084080446,
    name:'FIUBA',
  });

  const LatLngDestiny = (lat, long) =>{
    setDestiny({...origin,latitude: lat, longitude: long})
  }

  const mapRef = React.createRef();


  const coords = [origin,destiny];

  //Ajusta vista del mapa a origen/destino
 async function fitMapToOriginDestiny() {

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
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setOrigin({...origin,latitude: location.coords.latitude, longitude: location.coords.longitude});
    })();
  }, []);



//Mostrar/actualizar posicion 
  const changeRegion = () =>{

    mapRef.current.animateToRegion({
      latitude: origin.latitude,
      longitude: origin.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    })

  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} 
            ref={mapRef}
            //showsUserLocation = {true}
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
              
              { <MapViewDirections
              //API KEY Requerido
                origin={origin}
                destination={destiny}
                apikey='AIzaSyARscCcGqdra2Rjz5p8FXvm8GMeMEi6qak'
                strokeWidht={7}
                strokeColor= 'black'
                 >
            </MapViewDirections> }
            </MapView>
            {/* <Button
              type="button" 
              title="Mi Posicion"
              onPress={() =>(changeRegion())}>
            </Button>
            { <Text style={styles.paragraph}>Latitud: {origin.latitude}</Text> }
            { <Text style={styles.paragraph}>Longitud: {origin.longitude}</Text> } */}
            <View style={{marginTop: 10}}>
            { <Text style={styles.paragraph}> ----------------------------------------------------------- Origen------------------------------------------------------------ </Text> }
              <GooglePlacesAutocomplete
                placeholder="Type a place"
                query={{key: 'AIzaSyARscCcGqdra2Rjz5p8FXvm8GMeMEi6qak'}}
                fetchDetails={true}
                onPress={(data, details = null) => LatLngOrigin(details.geometry.location.lat, details.geometry.location.lng)}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('no results')}
                styles={{
                  container: {
                    flex: 0,
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
               <Text style={styles.paragraph}>---------------------------------------------------------- Destino------------------------------------------------------------- </Text> 
             
              <GooglePlacesAutocomplete
                placeholder="Type a place"
                query={{
                  key: 'AIzaSyARscCcGqdra2Rjz5p8FXvm8GMeMEi6qak',
                  language: 'es'}}
                fetchDetails={true}
                onPress={(data, details = null) => LatLngDestiny(details.geometry.location.lat, details.geometry.location.lng)}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('no results')}
                styles={{
                  container: {
                    flex: 0,
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
                <View style={{padding:20}}>
                <Button title={'Ajustar mapa'} onPress={fitMapToOriginDestiny} />
              </View>
              <View>
                <Button
                  style={{}}
                  type="button" 
                  title="Precio del viaje"
                  onPress={() =>Alert.alert('Precio')}>
                </Button>
              </View>
 </SafeAreaView>
  );
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
    height: (Dimensions.get('window').height)/2,
  },
  input: {
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});