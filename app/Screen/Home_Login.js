import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, Alert} from 'react-native';
import CAR from '../assets/18-yellow-flying-car.webp'
import Map_Google from "./Map_Google";
//import SelectList from 'react-native-dropdown-select-list' //to_do agregar a readme
import ProfileIconSelectList from '../components/atoms/ProfileIconSelectList'
import SelectUser from './SearchUser'
import { useNavigation } from '@react-navigation/native';

 const Home_Login = () => {
    const Logeaaaa = false;
    const Nav = useNavigation();
        
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
                onPress={() => console.log("apretado")}
                title="Mi perfil" 
                     />
            </View>
            
            <ProfileIconSelectList/>

            <View>
                <Button
                    title = "Realizar un viaje"
                    onPress = {() => {console.log('sdf');Nav.navigate("Map_Google");}}>
                </Button>
            
                <Button
                    title = "Buscar un usuario"
                    onPress = {() => {Nav.navigate("SearchUser");}} >
                </Button>

                <Button
                    title = "Usuario"
                    onPress = {() => {Nav.navigate("UserProfile");}} >
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

