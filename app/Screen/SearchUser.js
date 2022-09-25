
//import SelectList from 'react-native-dropdown-select-list' //to_do agregar a readme
import {TextInput, View} from 'react-native';
import React from 'react';

const SearchUser = () => {

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

export default SearchUser