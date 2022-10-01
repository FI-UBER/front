//import SelectList from 'react-native-dropdown-select-list' //to_do agregar a readme
import {TextInput, View, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';

const SearchUser = () => {
    //const Nav = useNavigation();

    return (
    <SafeAreaView style={styles.container}>
        <TextInput 
        placeholder = "Ingrese un nombre"
        style = {
            {borderBottomColor : "#ccc",
            borderBottomWidth : 1,
            backgroundColor: "#ccc"}
        }/>
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
});

export default SearchUser;