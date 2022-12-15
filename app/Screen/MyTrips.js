import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userHistory } from '../components/trip_api_endpoint';
import { currentSession } from '../context';

import { useFocusEffect } from '@react-navigation/native';

import { DataTable } from 'react-native-paper';
import { async } from '@firebase/util';


function MyTrips({navigation}) {
    const context = currentSession()
    const [HasTrip, setHas] = React.useState(true)
    const [theArray, setTheArray] = React.useState([]);
    var OplaceName='';
    var DplaceName='';

      //Hook
      useFocusEffect(
        React.useCallback(() => {
    //      alert('Screen was focused');
          async function history() {
            await userHistory(context.uid).then((response) => {
              if (response.history == null) {
                setHas(false)
              }
              else {
                if (response.history.length >= 1){
                  for (var i = 0; i < response.history.length; i++){
                    var change = false;
                    for (var j = 1; j < response.history[i][0].length; j++){
                      if (!change){

                        if (response.history[i][0][j] == ','){
                          change = true
                        }
                        else {
                          OplaceName+=response.history[i][0][j]
                        }
                      }
                      else{
                        if (response.history[i][0][j] ==')'){
                          continue
            
                      }
                        else{
                          DplaceName+=response.history[i][0][j]
                      }
                    }
                    }

                    setTheArray(theArray => [...theArray, {
                      id: i+1,
                      origin: OplaceName,
                      destination: DplaceName
                  }]);
                    OplaceName=''
                    DplaceName=''
                  
                  }
                
                }

              }
            })
          }
          history()
          
          return () => {
          //   alert('Screen was unfocused');
          };
      }, [])
      );


    function noHas(){
      return (
        <React.Fragment>
        <Text style={styles.text}>No trips</Text>
        {
          console.log(HasTrip)
        }
        </React.Fragment>
      )
    }

  return (
    <React.Fragment>
    <View style={styles.container}>
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Trip</DataTable.Title>
        <DataTable.Title >Origin</DataTable.Title>
        <DataTable.Title >Destination</DataTable.Title>
      </DataTable.Header>
      {
      theArray.map(theArray => {
          return (
            <DataTable.Row
              key={theArray.id}
              onPress={() => {
                console.log(`selected account ${theArray.id}`)
              }}
            >
              <DataTable.Cell>
                {theArray.id}
              </DataTable.Cell>
              <DataTable.Cell >
                {theArray.origin}
              </DataTable.Cell>
              <DataTable.Cell >
                {theArray.destination}
              </DataTable.Cell>
            </DataTable.Row>
        )}
        )
        }
         
      
    </DataTable>
    {!HasTrip && noHas() }
    </View>
    </React.Fragment>
  );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: 'center',
     // justifyContent: 'center',
    },
    text: {
        
      fontSize: 20,
      fontWeight: 'bold',
      margin: 15,
  }

});

export default MyTrips;