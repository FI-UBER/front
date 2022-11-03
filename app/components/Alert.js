import {View, Alert} from 'react-native';
import React from 'react';

const alertViajes = (origin, destiny) => {
Alert.alert(
   "Viajes",
   ('Origen: '+origin +' ---> Destino: '+ destiny),
   [
     {
       text: "Cancel",
       onPress: () => console.log("Cancel Pressed"),
       style: "cancel"
     },
     { text: "OK", onPress: () => console.log("OK Pressed") }
   ]
 )
}

const alerts = async(titulo, mensaje) => {
  let response;
  await Alert.alert(
      titulo,
      mensaje,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => ("OK Pressed") }
      ]
    )
    return response;
   }


   const AsyncAlert = (title, msg) => new Promise((resolve) => {
    Alert.alert(
      title,
      msg,
      [
        {
          text: 'ok',
          onPress: () => {
            resolve(true);
          },
        },
        {
          text: "Cancel",
          onPress: () => resolve(false),
          style: "cancel"
        },
      ],
      { cancelable: false },
    );
  });

export {alertViajes, alerts,AsyncAlert}