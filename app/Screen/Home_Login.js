import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import {Button} from 'react-native-paper'
import CAR from '../assets/18-yellow-flying-car.webp'
//import SelectList from 'react-native-dropdown-select-list' //to_do agregar a readme
import ProfileIconSelectList from '../components/atoms/ProfileIconSelectList'
import {alerts} from '../components/Alert'
import { useNavigation } from '@react-navigation/native';
import {currentSession} from '../context'
import {schedulePushNotification} from '../components/Noficationfunctions'

function Home_Login({navigation})  {
    const context = currentSession();
        
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={CAR} style={{ width: 305, height: 159 }} />
            </View>
            <View>
                <Text
                    style = {{
                        fontSize: 30,
                        textAlign: 'center',
                        marginTop: '20%',
                        color: 'black',
                    }}
                    >Successful Login
                </Text>
            </View>
            <View>
                <Button  
                    mode={"contained"}
                    onPress={() => {console.log("apretado Profile");navigation.navigate("Profile");}} 
                    >Mi perfil
                </Button>
            </View>
            
            <ProfileIconSelectList/>
            
            {(() => {
                if (context.passenger){
                    return (
                        <View>
                            <Button
                                mode={"contained"}
                                onPress={() => {console.log('viaje');navigation.navigate("Realizar Viaje");}}
                                >Realizar un viaje
                            </Button>
                        </View>
                    )
                }
                else{
                    return(
                        <View>
                            <Button
                                mode={"contained"}
                                onPress={() => {console.log('Buscar pasajero');navigation.navigate("Search Screen");}}
                                >Search Screen
                            </Button>
                        </View>
                )}
              }
              
            )()}
             <View>
                <Button
                    mode={"contained"}
                    onPress={() => {
                        const text ='uid :'+context.uid+'\n'+'trip_id: '+context.trip_id+'\n'+'Soy '+ (context.passenger ? 'Pasajero':'Chofer');
                        alerts("Datos",text)
                        
                        //schedulePushNotification("Hola","este es una prueba","Profile")
                    }}
                    >Datos
                </Button>
            </View>
        </SafeAreaView>
    );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default Home_Login;

