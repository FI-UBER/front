import React, {useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Alert} from 'react-native';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper'
import {currentSession} from '../context'
import  {FirebaseError}  from "../components/FirebaseError";
import {RegisterUser} from "../components/RegisterUser"

console.disableYellowBox = true;
// add this is main component of react native application




function Register({navigation}) {
    const context = currentSession();
    

const {control, setFocus, handleSubmit} = useForm({
      defaultValues: {
        email: '',
        password: '',
      },
      mode: 'onChange',
    });
  
    return (
      <View style={styles.containerStyle}>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
          <Text style={styles.headingStyle}>Registro</Text>
          <FormBuilder
            control={control}
            setFocus={setFocus}
            formConfigArray={[
                 {
                type: 'email',
                name: 'email',
  
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
                name: 'password',
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
            ]}s
          />
          <Button
            mode={'contained'}
            onPress={handleSubmit((data) => {
              //console.log('email', data.email);
              RegisterUser(data.email, data.password)
                .then((r) => {
                switch (r) {
                  case null: 
                    break;
                  default: 
                    console.log('uid:',r)
                    Alert.alert("Usuario creado. Ya puedes logearte")
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
            Registrarse
          </Button>
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    scrollViewStyle: {
      flex: 1,
      padding: 15,
      justifyContent: 'center',
    },
    headingStyle: {
      fontSize: 30,
      textAlign: 'center',
      marginBottom: 40,
    },
  });
  
  export default Register;