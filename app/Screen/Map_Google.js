import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,Dimensions, Alert, Button, TextInput } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function Map_Google() {
  //Origen
  const [origin, setOrigin] = React.useState({
    latitude: 0,
    longitude: 0,
  });

//Destino
  const [destiny, setDestiny] = React.useState({
    latitude: 0,
    longitude: 0,
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
    <View style={styles.container}>
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
                  title='Origen'
                  coordinate={origin}
                >
                </Marker>
                <Marker
                  title='Destino'
                  coordinate={destiny}>
              </Marker>
              
              {/* <MapViewDirections
              //API KEY Requerido
                origin={origin}
                destination={destiny}>
                apikey={apikey}
              </MapViewDirections> */}


            </MapView>
            { <Text style={styles.paragraph}>Mi posicion</Text> }
            <Button
              type="button" 
              title="Mi Posicion"
              onPress={() =>(changeRegion())}>
            </Button>
            { <Text style={styles.paragraph}>Latitud: {origin.latitude}</Text> }
            { <Text style={styles.paragraph}>Longitud: {origin.longitude}</Text> }
            <TextInput
            //Origen de viaje
                style={styles.input}
                onChangeText={origin}
                placeholder="Origen"
                keyboardType="default"

            />
            <TextInput
            //destino de viaje
                style={styles.input}
                onChangeText={destiny}
                placeholder="Destino"
                keyboardType="default"
            />
 </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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