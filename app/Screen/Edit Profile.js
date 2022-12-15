import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, View, ScrollView, Image} from 'react-native';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper'
import FIFIUBA from '../assets/car1.gif'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { data_update } from '../components/user_ap_endpoint';
import {currentSession} from '../context'


function Edit_Profile ({navigation})  {
  const context = currentSession();

   const [profile,setprofile] = React.useState("");
   const {control, setFocus, handleSubmit,reset} = useForm({
      defaultValues: {
        
        Nombre : '',
        Apellido: '',
      },
      mode: 'onChange',
    });
  
    const getProfile = async () => {  
      const jsonValue = await AsyncStorage.getItem('userprofile');
      const userProfile =  JSON.parse(jsonValue);  
      if (userProfile !== null) {
          setprofile(userProfile);
      }
      return userProfile;
   }


   useFocusEffect(
      React.useCallback(() => {
   //      alert('Screen was focused');
            getProfile().then((keyValue) => {
            });
            console.log(context.uid)
   
            return () => {
            //   alert('Screen was unfocused');
         };
      }, [])
      );

   const update = (name_, lastname_) => {
      var Pic, name, lastName, email, city, country, WalletAdress, WalletPrivateKey;
      email = profile.email;
      city = profile.city;
      country = profile.country;
      WalletAdress= profile.WalletAdress;
      WalletPrivateKey = profile.WalletPrivateKey;
      Pic = profile.idPic;
      getProfile().then(async(keyValue) => {
         if (name_==''){
            name = profile.name;
         }
         else {
            name = name_
         }
         if (lastname_ ==''){
            lastName = profile.lastName;
         }
         else {
            lastName = lastname_
         }
         
         data_update({name:name, lastname:lastName, 
                      id: context.uid, 
                      rol: context.passenger ? "passenger" : "driver",
                      idProfile: Pic.toString()});

         AsyncStorage.setItem('userprofile', JSON.stringify({'name': name, 'lastName': lastName, 'email': email,
          'city': 'Buenos Aires', 'country': 'Argentina', 'WalletAdress': WalletAdress, 'WalletPrivateKey': WalletPrivateKey,
          'idPic': Pic}));     
         
      });
   }

    return (
      <View style={styles.containerStyle}>
        <ScrollView           
        contentContainerStyle={{
          //  flexGrow:1,
            paddingRight:Dimensions.get('window').width/15,
            paddingLeft:Dimensions.get('window').width/15,
            justifyContent: 'center',
            backgroundColor:'white'
          }}>
        <View style={styles.loginHeader}>
              <Image source={FIFIUBA} style={styles.image} />
        </View>
        <View style={{
          //backgroundColor:"red",
          marginTop:Dimensions.get('window').height/10,
          height: Dimensions.get('window').height/5
        }}>
          <FormBuilder
            control={control}
            setFocus={setFocus}
            formConfigArray={[
              {
                type: 'text',
                name: 'Nombre',

                textInputProps: {
                  label: 'Name',
                },
              },
                {
                  type: 'text',
                  name: 'Apellido',
    
                  textInputProps: {
                    label: 'Lastname',
                  },
                },
            ]}
          />
        </View>
        <View
          style={styles.button_container}>
          <Button
            style ={styles.button}
            labelStyle={{
              fontSize:Dimensions.get('window').width* 0.03,
            }}
            mode={'contained'}
            onPress={handleSubmit((data) => {
               //console.log('email', data.Email);
               update(data.Nombre, data.Apellido);
               
               navigation.navigate('Profile')

              }
            )}>
            Update Data
          </Button>
          </View>
          <View
            style={styles.button_container}>
          <Button
            style ={styles.button}
            labelStyle={{
              fontSize:Dimensions.get('window').width* 0.03,
            }}
            mode={'contained'}
            onPress={handleSubmit((data) => {             
              navigation.navigate('Profile Image')
             }
            )}
            >
            Change Picture
          </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent:'center'
    },
    headingStyle: {
      fontSize: 30,
      textAlign: 'center',
      marginBottom: 40,
    },
    loginHeader: {
      height: Dimensions.get('window').height/3.5,
      alignItems:'center',
      justifyContent:'center',
      
    //  backgroundColor:"red"
    },
    image:{
      marginRight:10,
      width: Dimensions.get('window').width/1.7,
      height: Dimensions.get('window').height/3.5,
      resizeMethod: 'resize',
    },
    button: {
      width:"50%",
      height: Dimensions.get('window').height * 0.06,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button_container: {
        margin:Dimensions.get('window').height/60,
       // width: Dimensions.get('window').width,  
       // height: (Dimensions.get('window').height)/5,
        alignItems: 'center',
        justifyContent: 'center',
    }
  });
  


export default Edit_Profile;
