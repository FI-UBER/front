import React, { Component, useState, useEffect } from 'react';
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
import home from '../assets/home.png'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function UserProfile ( {navigation} ) {
    const [profile,setprofile] = React.useState("");

    const getProfile = async () => {  
        const jsonValue = await AsyncStorage.getItem('userprofile');
        const userProfile =  JSON.parse(jsonValue);  
        if (userProfile !== null) {
            setprofile(userProfile);
        }
        return userProfile;

    }

    useEffect(() => {  
        getProfile().then((keyValue) => {
            //nothing
     });
        
    },[]);
    
    return (
    <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                    source={profilepic}/>

                    <Text style={styles.name}>{profile.name} {profile.lastName}</Text>
                    
                    <Text style={styles.userInfo}>{profile.email}</Text>
                    <Text style={styles.userInfo}>{profile.city}, {profile.country}</Text>
                </View>
            </View>

            <View style={styles.body}>
                <View style={styles.item}>
                    <View style={styles.iconContent}>
                        <Image style={styles.icon} source={FIFI}/>
                    </View>
                    <View style={styles.infoContent}>
                        <TouchableOpacity
                            onPress={() => {navigation.navigate("MyTrips");}}
                        >
                            <Text style={styles.info}>Mis viajes</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.item}>
                    <View style={styles.iconContent}>
                        <Image style={styles.icon} source={profilepic}/>
                    </View>
                    <View style={styles.infoContent}>
                        <TouchableOpacity
                            onPress={() => {navigation.navigate("SearchUser");}}
                        >
                            <Text style={styles.info} >Buscar un usuario</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.item}>
                    <View style={styles.iconContent}>
                        <Image style={styles.icon} source={messages}/>
                    </View>
                    <View style={styles.infoContent}>
                        <TouchableOpacity
                            onPress={() => {navigation.navigate("MyConversations");}}
                        >
                            <Text style={styles.info}>Mis conversaciones</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.item}>
                    <View style={styles.iconContent}>
                        <Image style={styles.icon} source={config}/>
                    </View>
                    <View style={styles.infoContent}>
                        <TouchableOpacity
                            onPress={() => {navigation.navigate("Configuration");}}
                        >
                            <Text style={styles.info}>Configuración</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
        <View style={styles.item}>
            <View style={styles.iconContent}>
                <Image style={styles.icon} source={home}/>
            </View>
            <View style={styles.infoContent}>
                <TouchableOpacity
                    onPress={() => {navigation.navigate("Home Login");}}
                >
                    <Text style={styles.info}>Go back to HomeLogin</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text:{

    },
    header:{
        //backgroundColor: "#DCDCDC",
        backgroundColor: "#F6F0EF",
    },
    headerContent:{
        padding:30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
    },
    name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
    },
    userInfo:{
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
    },
    body:{
        backgroundColor: "#cfcbca",
        height:500,
        alignItems:'center',
    },
    item:{
        flexDirection : 'row',
        alignItems: 'center',
        //padding: 1
        //height:1
        
    },
    infoContent:{
        flex:1,
        alignItems:'flex-start',
        paddingRight:250,
        //width:400
    },
    iconContent:{
        flex:1,
        alignItems:'flex-start',
        //paddingRight:5,
        paddingLeft:10

    },
    icon:{
        width:30,
        height:30,
        marginTop:20,
        alignItems: 'flex-start'
    },
    info:{
        fontSize:18,
        marginTop:20,
        color: "#000000",
        alignItems: 'flex-start',
        width: 300,
        //paddingRight: 100,
    },
});

export default UserProfile;