//import SelectList from 'react-native-dropdown-select-list' //to_do agregar a readme
import {TextInput, View, StyleSheet, SafeAreaView, Pressable, Text} from 'react-native';
import {React, useState} from 'react';

const searchUser = (text) => {
        alert(text);
    }

function SearchUser({navigation}){
    //const Nav = useNavigation();
    const [text, setText] = useState('');

    

    return (
    <SafeAreaView style={styles.container}>
        <TextInput 
        placeholder = "Ingrese un nombre"
        textAlign={'center'}
        onSubmitEditing={() => {searchUser(text)}}
        onChangeText={newText => setText(newText)}
        style = {
            {borderBottomColor : "#ccc",
            borderBottomWidth : 1,
            backgroundColor: "#ccc",
            height: 40,
            width: 340,
            fontSize: 15,
            borderRadius: 20,
        }
        }/>
        <Pressable
            onPress={() => {searchUser(text);}}
            style={styles.buttonStyle}
            >
            <Text style={styles.buttonText}>
                 Buscar
            </Text>
        </Pressable> 
        <Pressable
            onPress={() => {navigation.navigate("Profile");}}
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
    },
    buttonText: {
        padding: 20,
    },
    buttonStyle: {
        backgroundColor: 'rgba(220, 220, 220, 0.8)',
        borderRadius: 50,
    }
});

export default SearchUser;