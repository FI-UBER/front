import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { createRef, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, TextInput} from 'react-native';
import {Button} from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native';
import FIFIUBA from '../assets/FIFIUBA.png'
import {currentSession} from '../context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import login from "./service"

const ref = React.createRef()

function Login({navigation}){
    const context = currentSession();
    const [email, UserID] = React.useState(null);
    const [password, Pass] = React.useState(null);
    const [error, setError] = useState('')
    const [token, setToken] = useState('')
    const [isLogin, setIsLogin] = React.useState(null);

    const setProfile = async() => {
        await AsyncStorage.setItem('userprofile', JSON.stringify({'name': 'nombre', 'lastName': 'apellido', 'email': 'email@email.com', 'city': 'Buenos Aires', 'country': 'Argentina'}));
        //por ahora hardcodeado, hay que obtener los datos del microservicio users
    }

      
  useFocusEffect(
    React.useCallback(() => {
   //   alert('Screen was focused');
    if (context.user) {
      navigation.navigate('Home Login');
    }  
      return () => {
     //   alert('Screen was unfocused');
      };
    }, [])
  );

    useEffect(() => {
      if(context.user){
        return (
        navigation.navigate("Home Login")
        )
      }
    }, []);    

    const handleSubmit = async()=>{

      try {
        setIsLogin(true)
        console.log({email, password})
        const { token } = await login({ email, password })
        setToken(token)
        context.login();
        navigation.navigate('Home Login')
    } catch (e) {
        setError(e.message)
    }
    
      // if (email!=null & password!=null){
      //   if (email.length!=0 & password.length!=0){
      //     console.log('Logeado');
      //     setIsLogin(true)
      //     context.login();
      //     setProfile()
      //     return(  
      //        navigation.navigate("Home Login")
      //     )
      //   }
      //   else{
      //     console.log('No Logeado');
      //     setIsLogin(false)
      //   } 
      // }
      // else{
      //   console.log('No Logeado');
      //   setIsLogin(false)
      
      // }
    }
    
    return(
        <SafeAreaView style={styles.container}>
          
          <View>
            <Image source={FIFIUBA} style={{ width: 305, height: 159 }} />
          </View>

          {(() => {
              if (isLogin == true){
                  return (
                      <Text style = {{backgroundColor: 'yellow'}}>Logeando</Text>
                  )
              }
              
              return null;
            })()}
          
          {(() => {
              if (context.token){
                  return (
                      <Text style = {{backgroundColor: 'yellow'}}>Logeado</Text>
                  )
              }
              
              return null;
            })()}


            <TextInput ref={createRef()}
              
                style={styles.input}
                onChangeText={UserID}
                placeholder="                   User                  "
                keyboardType="default"
                clearTextOnFocus = {true}

            />
            <TextInput 
                style={styles.input}
                secureTextEntry = {true}
                onChangeText={Pass}
                placeholder="            Password"
                keyboardType="default"
                
                />
          <View>
            <Button  
              mode={"contained"}
              onPress= {handleSubmit} 
              //disabled={isDisabled}
              >Login
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
        borderWidth: 4,
        padding: 10,
        backgroundColor: 'white',
      },
    //container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default Login;

