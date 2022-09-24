import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,Dimensions, Alert, Button, TextInput, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function Map_Google() {
  //Origen
  const [origin1, setOrigin1] = React.useState()
  const [origin, setOrigin] = React.useState({
    latitude: 0,
    longitude: 0,
    name:null,
  });
  
  const [destiny1, setDestiny1] = React.useState()
  const [destiny, setDestiny] = React.useState({
    //FIUBA
    latitude: -34.61032599547549,
    longitude: -58.36988084080446,
    name:'FIUBA',
    //Destino,
  });
  const mapRef = React.createRef();

  //Hook
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setOrigin({...origin,latitude: location.coords.latitude, longitude: location.coords.longitude})
    })();
  }, []);


//Mostrar/actualizar posicion al presionar boton
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
            { <Text style={styles.paragraph}>Mi posicion</Text> }
            <Button
              type="button" 
              title="Mi Posicion"
              onPress={() =>(changeRegion())}>
            </Button>
            { <Text style={styles.paragraph}>Latitud: {origin.latitude}</Text> }
            { <Text style={styles.paragraph}>Longitud: {origin.longitude}</Text> }
            <View style={{marginTop: 10}}>
            { <Text style={styles.paragraph}> ----------------------------------------------------------- Origen------------------------------------------------------------ </Text> }
              <GooglePlacesAutocomplete
                placeholder="Type a place"
                query={{key: 'AIzaSyARscCcGqdra2Rjz5p8FXvm8GMeMEi6qak'}}
                fetchDetails={true}
                onPress={(data, details = null) => console.log(data, details)}
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
              <View style={{marginVertical: 10, flex: 1, }}>
              { <Text style={styles.paragraph}>---------------------------------------------------------- Destino------------------------------------------------------------- </Text> }
              <GooglePlacesAutocomplete
                placeholder="Type a place"
                query={{
                  key: 'AIzaSyARscCcGqdra2Rjz5p8FXvm8GMeMEi6qak',
                  language: 'es'}}
                fetchDetails={true}
                onPress={(data, details = null) => console.log(data, details)}
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