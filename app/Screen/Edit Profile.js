import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, View, ScrollView, Text, Image} from 'react-native';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper'
import FIFIUBA from '../assets/car1.gif'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { data_update } from '../components/user_ap_endpoint';
import {app, storage} from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import {currentSession} from '../context'



function Edit_Profile ({navigation})  {
  const context = currentSession();

  const [uploading, setState] = useState(false);
  const [image, setImage] = useState(null);
  // progress
  const [percent, setPercent] = useState(0);
 
//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 4],
//       quality: 1,
//     });

//     console.log(result);

//     //if (!result.canceled) {
//       setImage(result.uri);
//     //}

//     //////////////////////////////////////////////////////
//     //////////////////////////////////////////////////////

    
//     //_handleImagePicked(result);

//      const storageRef = ref(storage, "data/user/");

//     // progress can be paused and resumed. It also exposes progress updates.
//     // // Receives the storage reference and the file to upload.
//      const uploadTask = uploadBytesResumable(storageRef, result);

//     uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//             const percent = Math.round(
//                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//             );

//             // update progress
//             setPercent(percent);
//         },
//         (err) => console.log(err),
//         () => {
//             // download url
//             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//                 console.log(url);
//             });
//         }
//     );
//   };

//   const _handleImagePicked = async (pickerResult) => {
//     try {
//       setState(true );

//       if (!pickerResult.cancelled) {
//         const uploadUrl = await uploadImageAsync(pickerResult.uri);
//         setState(uploadUrl );
//       }
//     } catch (e) {
//       console.log(e);
//       alert('Upload failed, sorry :(');
//     } finally {
//       setState(false );
//     }
//   };


// async function uploadImageAsync(uri) {
//   // Why are we using XMLHttpRequest? See:
//   // https://github.com/expo/expo/issues/2402#issuecomment-443726662
//   const blob = await new Promise((resolve, reject) => {
//     console.log('1')
//     const xhr = new XMLHttpRequest();
//     console.log('2')
//     xhr.onload = function() {
//       resolve(xhr.response);
//     };
//     console.log('3')
//     xhr.onerror = function(e) {
//       console.log(e);
//       reject(new TypeError('Network request failed'));
//     };
//     console.log('4')
//     xhr.responseType = 'blob';
//     xhr.open('GET', uri, true);
//     xhr.send(null);
//     console.log('5')

//   });
//   console.log('1')
//   const ref = storage.ref().child(uuid.v4());
//     console.log('12')
//   const snapshot = await ref.put(blob);

//   // We're done with the blob, close and release it
//   blob.close();

//   return await snapshot.ref.getDownloadURL();
// }
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////



   const update_ = () => {

   }

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
               console.log("custom",keyValue.name)
            });
   
            return () => {
            //   alert('Screen was unfocused');
         };
      }, [])
      );

   const update = (name_, lastname_) => {
      var name, lastName, email, city, country, WalletAdress, WalletPrivateKey;
      email = profile.email;
      city = profile.city;
      country = profile.country;
      WalletAdress= profile.WalletAdress;
      WalletPrivateKey = profile.WalletPrivateKey;

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
         
         data_update({name:name, lastname:lastName, email:email, 
                      address:WalletAdress, id: context.uid, 
                      rol: context.passenger ? "passenger" : "driver"});

         AsyncStorage.setItem('userprofile', JSON.stringify({'name': name, 'lastName': lastName, 'email': email,
          'city': 'Buenos Aires', 'country': 'Argentina', 'WalletAdress': WalletAdress, 'WalletPrivateKey': WalletPrivateKey}));     
         
      });
   }
//     // State to store uploaded file
//     const [file, setFile] = useState("");
 

 
//     // Handle file upload event and update state
//     function handleChange(event) {
//         setFile(event.target.files[0]);
//     }


//    const handleUpload = () => {
//     if (!file) {
//         alert("Please upload an image first!");
//     }

//     const storageRef = ref(storage, `/files/${file.name}`);

//     // progress can be paused and resumed. It also exposes progress updates.
//     // Receives the storage reference and the file to upload.
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//             const percent = Math.round(
//                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//             );

//             // update progress
//             setPercent(percent);
//         },
//         (err) => console.log(err),
//         () => {
//             // download url
//             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//                 console.log(url);
//             });
//         }
//     );
// };



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
        <View>
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
            >
            photo
          </Button>
          </View>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          {/* <View>
            <Text>
              {percent} "% done"
            </Text>
          </View> */}
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
  


export default Edit_Profile;
