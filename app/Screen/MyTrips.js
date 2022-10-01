import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import profilepic from '../assets/profilepic.jpg'
import messages from '../assets/conversaciones.png'
import config from '../assets/config.png'
import FIFI from '../assets/FIFIUBA.png'
import { useNavigation } from '@react-navigation/native';

//export default class UserProfileView extends Component {

const MyTrips = () => {
    const Nav = useNavigation();

    return (
    <SafeAreaView style={styles.container}>
        <Text> Mis viajes </Text>
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
});

export default MyTrips;