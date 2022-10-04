import React from "react";
import { Platform, Text, View, StyleSheet,Dimensions, Alert, Button, TextInput, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from '@env'
import { useNavigation } from '@react-navigation/native';

 function View_Map(Olat, Olng,Dlat, Dlng) {
    const Nav = useNavigation();

    const [distance, setDistance] = React.useState(0)
  
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



  
    return(
        <SafeAreaView style={styles.container}>
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
                        console.log(result.distance)
                      }}
                    >
                    </MapViewDirections>
                 </MapView> 
                    <View>
                        <Button
                            style={{padding:20}}
                            type="button" 
                            title="Volver a elegir"
                            onPress = {() => {console.log('Elegir de nuevo');Nav.navigate("Choose");}}>
                        </Button>
                    </View>
         
                </SafeAreaView>
    );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#193752',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default View_Map;
