import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, Alert, TextInput} from 'react-native';
import FIFIUBA from '../assets/FIFIUBA.png'



const Login = () => {
    const [utext, UserID] = React.useState(null);
    const [ptext, Pass] = React.useState(null);
    const Nav = useNavigation();


    const handleSubmit = () => {
      if (utext!=null & ptext!=null){
        if (utext.length!=0 & ptext.length!=0){
          console.log('Logeado');
          Nav.navigate("HomeScreen Logeado")
        }
    }
    }

    
    return(
        <SafeAreaView style={styles.container}>
          <View>
            <Image source={FIFIUBA} style={{ width: 305, height: 159 }} />
          </View>
            <TextInput
                style={styles.input}
                onChangeText={UserID}
                placeholder="User"
                keyboardType="default"

            />
            <TextInput
                style={styles.input}
                secureTextEntry = {true}
                onChangeText={Pass}
                placeholder="Password"
                keyboardType="default"
            />
          <View>
            <Button  
              type="button" 
              title="Login"
              onPress= {handleSubmit} 
              //disabled={isDisabled}
              >
              </Button>
          </View> 
        </SafeAreaView>
    );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#193752',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 20,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
      },
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default Login;

