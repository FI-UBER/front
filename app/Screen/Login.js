import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, Alert, TextInput} from 'react-native';
import FIFIUBA from '../assets/FIFIUBA.png'




const Login = () => {
    const [text, UserID] = React.useState(null);
    const [n, Pass] = React.useState(null);
    return(
        <SafeAreaView style={styles.container}>
            <View>
            <Image source={FIFIUBA} style={{ width: 305, height: 159 }} />
            </View>
            <TextInput
                style={styles.input}
                onChangeText={UserID}
                placeholder="User"
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                onChangeText={Pass}
                placeholder="Password"
                keyboardType="default"
            />
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
    input: {
        height: 40,
        margin: 20,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
      },
});

export default Login;

