//import SelectList from 'react-native-dropdown-select-list' //to_do agregar a readme
import {Text, View, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import React from 'react';

function Configuration ({navigation}) {
    //const Nav = useNavigation();

    return (
    <SafeAreaView style={styles.container}>
        <Text> Configuración </Text>
        <Pressable
            onPress={() => {navigation.navigate("Profile")}}
                style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}
            >
            <Text style={styles.text}>
                 Go Back to Profile
            </Text>
        </Pressable> 
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
    }
})

export default Configuration;