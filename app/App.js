import React, { useRef, useState} from 'react';
import { Text, View, StyleSheet, Modal, Button } from 'react-native';
import Navigation from "./Navigation";
//import L from "./Screen/Logeado"
import Map_Google from "./Screen/Map_Google";
import MapView, { PROVIDER_GOOGLE, Marker,Polyline } from 'react-native-maps';

export default function App() {
  return (
    <Navigation />
    //<Map_Google />

  );
}
//fitToCoordinate usar para achicar mapa a las coordenadas marcadas
//Ejemplo abajo


// export default function App() {
//   const position = {
//     latitude: 51,
//     longitude: -0.48,
//   };

//    const [coords, setCoords] = useState([
//     { latitude: 37.766155, longitude: -122.51058 },
//     { latitude: 37.7948605, longitude: -122.4596065 },
//     { latitude: 37.799476, longitude: -122.397995 },
//   ]);


//   const map = useRef();

//   async function fitMapToPolyline() {

// map.current.fitToCoordinates(coords, {
//       edgePadding: {
//         top: 20,
//         right: 20,
//         bottom: 20,
//         left: 20,
//       },
//     });


//   }

//   return (
//     <View style={style.container}>
//       <Modal animationType={'slide'} visible={true}>
//         <MapView
//           ref={map}
//           style={[style.map]}
//           initialRegion={{
//             latitude: 37.7948605,
//             longitude: -122.4596065,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           provider={PROVIDER_GOOGLE}>
//        {coords.map((coords, index) => (
//             <Marker key={index} coordinate={coords} />
//           ))}
//           <Polyline
//             coordinates={coords}
//             strokeColor={'rgb(0, 0, 0)'}
//             strokeWidth={6}
//           />
//         </MapView>
//         <View style={style.button}>
//           <Button title={'Fit map to see whole Polyline'} onPress={fitMapToPolyline} />
//         </View>
//       </Modal>
//     </View>
//   );
// }


// const style = StyleSheet.create({
//   map: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   button: {
//     position: 'absolute',
//     top: 100,
//   },
// });
