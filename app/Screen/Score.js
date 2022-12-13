import React, { useEffect } from 'react';
import {  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import {currentSession} from '../context'
import {Button} from 'react-native-paper'
import { ScoreAUser } from '../components/trip_api_endpoint';


//Stars
import StarCorner from '../assets/star_corner.png'
import StarFilled from '../assets/star_filled.png'

export const Score = ({route,navigation}) => {

   const context = currentSession();
   const [trip_id, setTrip] = React.useState(0)
   const [stateStar, setStar] = React.useState(5);
   const [maxStar, setMax] = React.useState([1,2,3,4,5]);

   useEffect(() => {
      const {trip} = route?.params || {};
      setTrip(trip)
    }, [route]);

   const CustomRatingBar = () => {
       return (
           <View style = {styles.customBar}>
               {
                   maxStar.map((item,key) => {
                       return (
                           <TouchableOpacity
                              activeOpacity={0.8}
                              key={item}
                              onPress={() => setStar(item)}
                           >
                           <Image style={styles.StarImage}
                                   source={
                                   item <= stateStar
                                       ?   StarFilled 
                                       :   StarCorner
                                   }
                               />
                           </TouchableOpacity>
                       )
                   })
               }
           </View>
       )
   }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.space} >
            <Text style={styles.Text}> Please rate your {context.passenger ?"Driver" : "Passenger"} </Text>
        </View>
        <View style={styles.space}>
        <CustomRatingBar/>
        <Text style={styles.Text}> {stateStar} / {maxStar.length}</Text>
        </View>
        <View  style={styles.space}>
            <Button  
              mode={"contained"} 
              onPress= {() =>{
                  console.log(trip_id, context.uid, stateStar)
                  ScoreAUser(context.uid, trip_id, stateStar )
                  navigation.navigate("Home");
               }}
              buttonColor="green" 
              > Send Score
            </Button>
         </View>
      </SafeAreaView>
    )
}


const styles = StyleSheet.create({
   space:{
      flex:1,
      justifyContent: 'center',
      alignContent: 'center'
   },
   container: {
       flex: 1,
       padding: 10,
       justifyContent: 'center',
       backgroundColor: "white"
   },
   Text:{
      textAlign: 'center',
      fontSize: 23,
   },
   customBar: {
       justifyContent: 'center',
       flexDirection: 'row',
     },
     StarImage: {
       width: 40,
       height: 40,
       resizeMode: 'cover',
     },
});