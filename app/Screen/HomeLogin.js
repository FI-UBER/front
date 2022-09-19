import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, Alert} from 'react-native';
import FIFI from '../assets/building.jpg'


 const HomeLogin = () => {
    return(
        <SafeAreaView style={styles.container}>
            <View>
            <Image source={FIFI} style={{ width: 305, height: 159 }} />
            </View>
                <View>
                    <Text
                        style = {{
                            fontSize: 30,
                            textAlign: 'center',
                            marginTop: '20%',
                            color: 'black',
                        }}
                    >Succesful Login
                    </Text>
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

export default HomeLogin;

