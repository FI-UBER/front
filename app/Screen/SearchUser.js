
//import SelectList from 'react-native-dropdown-select-list' //to_do agregar a readme
import {TextInput, View,StyleSheet, Pressable,Text} from 'react-native';
import React from 'react';
import {currentSession} from '../context'

function SearchUser({ navigation }) {
  const context =currentSession();
  
      return(
      
      <TextInput 
          placeholder = "Ingrese un nombre"
          style = {
              {borderBottomColor : "#ccc",
              borderBottomWidth : 1,
              backgroundColor: "#ccc"}
          }/>
          
      )
    };

const styles = StyleSheet.create({
  body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  text: {
      fontSize: 40,
      fontWeight: 'bold',
      margin: 10,
  }
})
export default SearchUser