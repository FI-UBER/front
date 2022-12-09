import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { createRef, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View,Dimensions, StatusBar, SafeAreaView, Linking, TextInput,ScrollView, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper' 
import { useFocusEffect } from '@react-navigation/native';
import FIFIUBA from '../assets/car1.gif'
import {currentSession} from '../context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from "../components/RegisterUser"
import  {FirebaseError}  from "../components/FirebaseError";
import { check_passenger_atLogin, getData } from '../components/user_ap_endpoint';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ref = React.createRef()

function Login({navigation}){
    const context = currentSession();
    const [email, UserID] = React.useState(null);
    const [password, Pass] = React.useState(null);
    const [error, setError] = useState('')
    const [isLogin, setIsLogin] = React.useState(null);

    const setProfile = async(email, name, lastname, w_address, w_pKey) => {
        await AsyncStorage.setItem('userprofile', JSON.stringify({'name': name,
         'lastName': lastname, 'email': email, 'city': 'Buenos Aires', 'country': 'Argentina',
        'WalletAdress':w_address, 'WalletPrivateKey': w_pKey}));
    }

    const getDataUser = async(email_, typeUser) => {
      await getData({email: email_, rol: typeUser}).then((data) =>{
        console.log(data);
        context.login(data._id)
        
        setProfile(email_, data.name, data.lastname, data.address, data.key)
      })
    }

      
  useFocusEffect(
    React.useCallback(() => {
   //   alert('Screen was focused');
    if (context.user) {
      navigation.navigate('App');
    }  
      return () => {
     //   alert('Screen was unfocused');
      };
    }, [])
  );

    useEffect(() => {
      if(context.user){
        return (
        navigation.navigate('App')
        )
      }


    }, []);    

    const handleSubmit = async()=>{
      login(email, password)
        .then(async(r) => {
        switch (r) {
          case null:
            break;
          default:
            var type;
            await check_passenger_atLogin({email: email}).then((response) => {
              const passenger = response.passenger;
                if (passenger == true ){ 
                  getDataUser(email, "passenger")
                  context.setPassenger_()
                }
                else{
                  getDataUser(email, "driver")
                  context.setDriver()
                }
                
                setIsLogin(true)
                
                navigation.navigate("App")
              })
            break;
          }   
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage)
          setIsLogin(false)
          FirebaseError(errorMessage)
        });
    }

    return(
        <KeyboardAwareScrollView
          style={{ 
            flex: 1,
          }}
          contentContainerStyle={{
            flexGrow:1,
            justifyContent: 'center',
            backgroundColor:'white'
          }}
        >
            <View style={styles.loginHeader}>
              <Image source={FIFIUBA} style={styles.image} />
            </View>
  
            <View style={styles.loginInputs}>
              <TextInput 
                placeholder="Username"
                style={styles.input}
                onChangeText={UserID}
                placeholderTextColor={"black"}
                textAlign='center'
                keyboardType="default"
                clearTextOnFocus = {true}
              />
              <TextInput 
                  style={styles.input}
                  textAlign='center'
                  secureTextEntry = {true}
                  onChangeText={Pass}
                  placeholder="Password"
                  placeholderTextColor={"black"}
                  keyboardType="default"
              />
            </View>
            <View style={styles.button_container}>
              <Button 
                style ={styles.button}
                labelStyle={{
                  fontSize:Dimensions.get('window').height* 0.02,
                }}
                icon="login" 
                mode={"contained"}
                onPress= {handleSubmit} 
                >Sign in
              </Button>

              <Button
                style ={styles.button}
                labelStyle={{
                  fontSize:Dimensions.get('window').height* 0.02,
                }}
                icon="badge-account-horizontal"  
                mode={"contained"}
                onPress= {()=> {navigation.navigate("Register") }} 
                >Sign up
              </Button>
            </View>
            <View style={{
              flex:1, 
              marginTop:20, 
              alignItems: 'center'
              }}>
              {/* <Text
                numberOfLines={1}
                adjustsFontSizeToFit ={true}
                style={{
                  fontStyle: "italic", 
                }} > ¿Has olvidado tu contraseña?. 
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit ={true}
                  style={{   
                    color: 'blue',
                  }}
                  onPress={() => Linking.openURL('https://google.com')}>
                  Obten Ayuda
                </Text> 
              </Text> */}
            </View>
        </KeyboardAwareScrollView>
      );
    }
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    loginHeader: {
      height: Dimensions.get('window').height/2.9,
      alignItems:'center',
   //   justifyContent:'center'
    },
    headerText: {
      fontSize: 40,
      color: '#0066cc',
      textAlign: 'center'
    },
    loginInputs: {
      alignItems: 'center',
      justifyContent:'center',
      height:Dimensions.get('window').height/5
    },
    image:{
      marginRight:10,
      width: Dimensions.get('window').width/1.7,
      height: Dimensions.get('window').height/3.5,
      resizeMethod: 'resize',
            },
      input: {
        width: Dimensions.get('window').width/1.2,
        padding:10,
        borderColor:"grey",
        borderWidth:1,
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius:20,
        borderTopLeftRadius: 20,
        margin:"1%"
      },
      button: {
        width:"40%",
        margin:"5%",
        height: Dimensions.get('window').height * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button_container: {
          width: Dimensions.get('window').width,  
          height: (Dimensions.get('window').height)/5,
          alignItems: 'center',
          justifyContent: 'center',
      }
      
  });

export default Login;

