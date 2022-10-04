import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
} from 'react-native';
import {currentSession} from '../context'


export default function Profile({ navigation }) {
   const context = currentSession();

    return (
         <View style={styles.body}>
             <Text style={styles.text}>
                 Profile
         </Text>
             <Pressable
                 onPress={() =>{navigation.navigate('Settings');}}
                 style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}
             >
                 <Text style={styles.text}>
                     Go to Settings
           </Text>
             </Pressable>
         </View>
     )
   }


const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 10,
    }
})