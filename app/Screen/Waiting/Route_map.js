import {Text, View, StyleSheet, Dimensions,SafeAreaView, Pressable} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper'
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from '@env'

function Route_Map({navigation}) {
   const mapRef = React.createRef();

   //Origen
  const [origin, setOrigin] = React.useState({
   //Casa Rosada como primer origen
   latitude: -34.60738448397424, 
   longitude: -58.37032071534236,
   name:null,
 });
 
   //Destino,
 const [destiny, setDestiny] = React.useState({
   //FIUBA
   latitude: -34.617639,
   longitude: -58.368056,
   name:'FIUBA',
 });

    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}> Mapa a Mostrar </Text>
         <View>
            <Button  
                  mode={"contained"}
                  onPress={() => {navigation.navigate("Home Login");}} 
                  >Home
            </Button>
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
                    console.log("Distancia")
                    console.log(result.distance)
                  }}>
                </MapViewDirections>
            </MapView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F6F0EF",
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        
        fontSize: 40,
        fontWeight: 'bold',
        margin: 10,
    },
    map: {
      width: Dimensions.get('window').width,
      height: (Dimensions.get('window').height)/2,
    },
})

export default Route_Map;