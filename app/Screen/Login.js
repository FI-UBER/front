import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, Alert, TextInput} from 'react-native';
import FIFIUBA from '../assets/FIFIUBA.png'



const Login = () => {
    const [mtext, Mail] = useState(null);
    const [ptext, Pass] = useState(null);
    const [isDisabled, setDisabled] = useState(false);
    const Nav = useNavigation();


    const handleLogin = () => {
      if (mtext!=null & ptext!=null){
        if (mtext.length!=0 & ptext.length!=0){
          body = { mail: mtext, password: ptext } 
          console.log(body);
          console.log('Logeado');
          //setDisabled(!isDisabled)
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
                onChangeText={Mail}
                placeholder="Your email"
                keyboardType="default"

            />
            <TextInput
                style={styles.input}
                onChangeText={Pass}
                placeholder="Your password"
                keyboardType="default"
            />
          <View>
            <Button  
              type="button" 
              title="Sign In"
              onPress= {handleLogin} 
              disabled={isDisabled}>
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

