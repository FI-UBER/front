import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Pressable
} from 'react-native';
import profilepic from '../assets/profilepic.jpg'
import messages from '../assets/conversaciones.png'
import config from '../assets/config.png'
import FIFI from '../assets/FIFIUBA.png'
import { useNavigation } from '@react-navigation/native';

//export default class UserProfileView extends Component {

function MyTrips({navigation}) {
    const Nav = useNavigation();

    return (
    <SafeAreaView style={styles.container}>
        <Text> Mis viajes </Text>
        <Pressable
            onPress={() => {navigation.navigate("Profile")}}
                style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}
            >
            <Text style={styles.text}>
                 Go Back to Profile
            </Text>
        </Pressable> 
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F6F0EF",
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        
      fontSize: 40,
      fontWeight: 'bold',
      margin: 10,
  }

});

export default MyTrips;