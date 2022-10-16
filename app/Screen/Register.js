import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Alert} from 'react-native';
import FIFIUBA from '../assets/FIFIUBA.png'
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper'
import {currentSession} from '../context'
import  app  from "../firebase"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
            ]}
          />
          <Button
            mode={'contained'}
            onPress={handleSubmit((data) => {
              //console.log('email', data.email);
              //Alert.alert("Registrado");
              //context.login(data.name);
              const auth = getAuth(app);
              createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  console.log(user)
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  Alert.alert(errorMessage)
                  //..
               });
             // navigation.navigate("Home Login")
            })}>
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