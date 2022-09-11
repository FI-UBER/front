import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, Alert, Settings} from 'react-native';
import FIFIUBA from '../assets/FIFIUBA.png'



const Register = () => {
    return(
        <SafeAreaView style={styles.container}>
            <View>
            <Image source={FIFIUBA} style={{ width: 305, height: 159 }} />
            </View>
                <View>
                    <Text
                        style = {{
                            fontSize: 30,
                            textAlign: 'justify',
                            marginTop: '20%',
                            color: 'white',
                        }}
                    >Register Screen
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

export default Register;