import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { createRef, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, Alert, TextInput} from 'react-native';
import FIFIUBA from '../assets/FIFIUBA.png'
import {currentSession} from '../context'


const ref = React.createRef()

function Login({navigation}){
    const context = currentSession();
    const [utext, UserID] = React.useState(null);
    const [ptext, Pass] = React.useState(null);
    const [isLogin, setIsLogin] = React.useState(null);


    useEffect(() => {
      if(context.user){
        return (
        navigation.navigate("Home Login")
        )
      }
    }, [context.user]);    

    function handleSubmit() {
      if (utext!=null & ptext!=null){
        if (utext.length!=0 & ptext.length!=0){
          console.log('Logeado');
          setIsLogin(true)
          context.login();
          return(  
             navigation.navigate("Home Login")
          )
        }
        else{
          console.log('No Logeado');
          setIsLogin(false)
        } 
      }
      else{
        console.log('No Logeado');
        setIsLogin(false)
      
      }
    }
    
    return(
        <SafeAreaView style={styles.container}>
          
          <View>
            <Image source={FIFIUBA} style={{ width: 305, height: 159 }} />
          </View>

          {(() => {
              if (isLogin == false){
                  return (
                      <Text style = {{backgroundColor: 'yellow'}}>Usuario no encontrado</Text>
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
        borderWidth: 4,
        padding: 10,
        backgroundColor: 'white',
      },
    //container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default Login;

