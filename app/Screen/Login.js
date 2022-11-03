import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { createRef, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, TextInput} from 'react-native';
import {Button} from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native';
import FIFIUBA from '../assets/FIFIUBA.png'
import {currentSession} from '../context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from "../components/RegisterUser"
import  {FirebaseError}  from "../components/FirebaseError";

const ref = React.createRef()

function Login({navigation}){
    const context = currentSession();
    const [email, UserID] = React.useState(null);
    const [password, Pass] = React.useState(null);
    const [error, setError] = useState('')
    const [isLogin, setIsLogin] = React.useState(null);

    const passenger=true;

    const setProfile = async(email) => {
        await AsyncStorage.setItem('userprofile', JSON.stringify({'name': 'nombre', 'lastName': 'apellido', 'email': email, 'city': 'Buenos Aires', 'country': 'Argentina'}));
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
       //Pasajero
        if (passenger){
          context.setPassenger_()
        }
        //Conductor
        else{
          context.setDriver()
        }

      } catch (e) {
          setError(e.message)
      }
      //Logeo con firebase

      login(email, password)
        .then((r) => {
        switch (r) {
          case null:
            break;
          default: 
            context.login(r)
            setIsLogin(true)
            setProfile(email)
            navigation.navigate("Home Login")
            break;
          }   

        })
        .catch((error) => {
          const errorMessage = error.message;
          setIsLogin(false)
          FirebaseError(errorMessage)
        });
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
              if (error){
                  return (
                      <Text style = {{backgroundColor: 'yellow'}}>{error};</Text>
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

