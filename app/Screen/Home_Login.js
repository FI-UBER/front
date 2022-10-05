import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, Alert} from 'react-native';
import CAR from '../assets/18-yellow-flying-car.webp'
//import SelectList from 'react-native-dropdown-select-list' //to_do agregar a readme
import ProfileIconSelectList from '../components/atoms/ProfileIconSelectList'
import SelectUser from './SearchUser'
import { useNavigation } from '@react-navigation/native';

function Home_Login({navigation})  {
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
                onPress={() => {console.log("apretado Profile");navigation.navigate("Profile");}}
                title="Mi perfil" 
                     />
            </View>
            
            <ProfileIconSelectList/>

            <View>
                <Button
                    title = "Realizar un viaje"
                    onPress = {() => {console.log('viaje');navigation.navigate("Realizar Viaje");}}>
                </Button>
            
                <Button
                    title = "Buscar un usuario"
                    onPress = {() => {console.log('Buscar Usuario');navigation.navigate("SearchUser");}} >
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

