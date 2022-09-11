import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, Alert} from 'react-native';
import FIFIUBA from '../assets/FIFIUBA.png'


 const Home = () => {
    return(
        <SafeAreaView style={styles.container}>
            <View>
            <Image source={FIFIUBA} style={{ width: 305, height: 159 }} />
            </View>
                <View>
                    <Text
                        style = {{
                            fontSize: 30,
                            textAlign: 'center',
                            marginTop: '20%',
                            color: 'white',
                        }}
                    >Bienvenido a FIFIUBA
                    </Text>
                </View>
                </SafeAreaView>
    );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#193752',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default Home;

