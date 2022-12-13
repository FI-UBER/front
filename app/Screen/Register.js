import React, {useState} from "react";
import { StyleSheet, Dimensions, View, ScrollView, Alert, Image} from 'react-native';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper'
import {currentSession} from '../context'
import  {FirebaseError}  from "../components/FirebaseError";
import {RegisterUser} from "../components/RegisterUser"
import FIFIUBA from '../assets/car1.gif'
import {register_passenger, register_driver} from '../components/user_ap_endpoint'

console.disableYellowBox = true;
// add this is main component of react native application


function Register({navigation}) {
    const context = currentSession();

const {control, setFocus, handleSubmit,watch} = useForm({
      defaultValues: {
        
        Nombre : '',
        Apellido: '',
        nacimiento: '',
        Email: '',
        Password: '',
        repeat_password: '',
        rol: '',

      },
      mode: 'onChange',
    });
  
    return (
      <View style={styles.containerStyle}>
        <ScrollView           
        contentContainerStyle={{
            flexGrow:1,
            paddingRight:Dimensions.get('window').width/15,
            paddingLeft:Dimensions.get('window').width/15,
            justifyContent: 'center',
            backgroundColor:'white'
          }}>
        <View style={styles.loginHeader}>
              <Image source={FIFIUBA} style={styles.image} />
        </View>
        <View>
          <FormBuilder
            control={control}
            setFocus={setFocus}
            formConfigArray={[
              {
                type: 'text',
                name: 'Nombre',
  
                rules: {
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                },
                textInputProps: {
                  label: 'Name',
                },
              },
                {
                  type: 'text',
                  name: 'Apellido',
    
                  rules: {
                    required: {
                      value: true,
                      message: 'Lastname is required',
                    },
                  },
                  textInputProps: {
                    label: 'Lastname',
                  },
                },
                  {
                    type: 'text',
                    name: 'nacimiento',
      
                    rules: {

                      pattern: {
                        value:
                          /[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}|/,
                        message: 'Date is invalid',
                      },
                      minLength:{
                        value: 10,
                        message:"Correct Format DD/MM/AAAA"} ,
                      maxLength:{
                        value: 10,
                        message:"Correct Format DD/MM/AAAA"} ,
                     valueAsDate: true,
                      required: {
                        
                        value: true,
                        message: 'Birthday is required',
                      },
                      validate: {
                           mes_mayor: value => {if(value.substring(3, 5)> "12")
                        {return "Invalid month" }
                        },
                        mes_menor: value => {if(value.substring(3, 5)<= "00")
                        {return "Invalid month" }
                        },
                        dia_mayor: value => {if(value.substring(0, 3)> "32")
                        {return "Invalid day" }
                        },
                        dia_menor: value => {if(value.substring(0, 3)< "01")
                        {return "Invalid day" }
                        },
                        año_mayor: value => {if(value.substring(6, 10)> "2004")
                        {return "Must be over 18 years old" }
                        },
                      }
                    },
                    textInputProps: {
                      label: 'Birthday: DD/MM/AAAA',
                    },
                  },
                 {
                type: 'email',
                name: 'Email',
  
                rules: {
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                },
                textInputProps: {
                  label: 'Email',
                },
              },
              {
                type: 'password',
                name: 'Password',
                rules: {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                },
                textInputProps: {
                  label: 'Password',
                },
              },
              {
                type: 'password',
                name: 'repeat_password',
                rules: {
                  required: 
                  { value: true,
                    message: 'Repeat password is required',
                  },
                  validate: {
                    isequal: value => {if(value != watch("Password"))
                      {return "Your passwords do no match" }
                    }
                  }
                },
                textInputProps: {
                  label: 'Confirm Password',
                },
              },
              {
                name: 'rol',
                type: 'autocomplete',
                textInputProps: {
                  label: 'What role do you occupy?',
                },
                rules: {
                  required: {
                    value: true,
                    message: 'City is required',
                  },
                },
                options: [
                  {
                    label: 'Passenger',
                    value: 'passenger',
                  },
                  {
                    label: 'Driver',
                    value: 'driver',
                  },
                ],
              },
            ]}
          />
        </View>
        <View
          style={styles.button_container}>
          <Button
            style ={styles.button}
            labelStyle={{
              fontSize:Dimensions.get('window').height* 0.02,
            }}
            mode={'contained'}
            onPress={handleSubmit((data) => {
              console.log('rol', data.rol);
              RegisterUser(data.Email, data.Password)
                .then(async(r) => {
                switch (r) {
                  case null: 
                    break;
                  default: 
                    console.log('uid:',r)
                    await register_passenger({
                      email:data.Email, password:data.Password,
                      passwordConfirmation:data.repeat_password,
                      name:data.Nombre,
                      lastname:data.Apellido, 
                      birthday:data.nacimiento,
                      rol:data.rol},
                       data.rol)                             
                    Alert.alert("Account created. You can login ")
                    navigation.navigate("Login")
                    break;
                }   

                })
                .catch((error) => {
                  const errorMessage = error.message;
                  FirebaseError(errorMessage)
                  
                });
              }
            )}>
            Sign up
          </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: 'white'
    },
    headingStyle: {
      fontSize: 30,
      textAlign: 'center',
      marginBottom: 40,
    },
    loginHeader: {
      height: Dimensions.get('window').height/3,
      alignItems:'center',
      justifyContent:'center'
    },
    image:{
      resizeMethod: 'resize',
      width: 240,
      height: 230,
    },
    button: {
      width:"40%",
      height: Dimensions.get('window').height * 0.05,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button_container: {
       // width: Dimensions.get('window').width,  
       // height: (Dimensions.get('window').height)/5,
        alignItems: 'center',
        justifyContent: 'center',
    }
  });
  
  export default Register;