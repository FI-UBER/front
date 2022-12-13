
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

    const SaveCurrentTrip = async(id, Olat, Olng, Dlat, Dlng, price_) => {
      await AsyncStorage.setItem('lastTrip', JSON.stringify({'id': id,
       'Olat': Olat, 'Olng': Olng, 'Dlat': Dlat, 'Dlng': Dlng,
      'price': price_}));
  }

  const getCurrentTrip_ = async () => {  
      const jsonValue = await AsyncStorage.getItem('lastTrip');
      const userProfile =  JSON.parse(jsonValue);  
      console.log(userProfile);
      return userProfile;
      }

//   navigation.navigate("Searching",{
//    id: trip_id_,Olat: origin.latitude ,Olng: origin.longitude,
//     Dlat: destiny.latitude, Dlng: destiny.longitude, price: price_})
// }

export {SaveCurrentTrip,getCurrentTrip_};
