import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight, 
  Dimensions,
  Platform,
  SrollView
} from 'react-native';
import profilepic from '../assets/profilepic.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

//Stars
import StarCorner from '../assets/star_corner.png'
import StarFilled from '../assets/star_filled.png'

//Iconos
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

function UserProfile ( {navigation} ) {

    const [profile,setprofile] = React.useState("");

    ///////////////////////////////////////////
    const [stateStar, setStar] = React.useState(5);
    const [maxStar, setMax] = React.useState([1,2,3,4,5]);

    const CustomRatingBar = () => {
        return (
            <View style = {styles.customBar}>
                {
                    maxStar.map((item,index) => {
                        key={index}
                        return (
                            
                            <Image style={styles.StarImage}
                                    source={
                                    item <= stateStar
                                        ?   StarFilled 
                                        :   StarCorner
                                    }
                                />
                        )
                    })
                }

            </View>
        )
    }
/////////////////////////////////////////

    const getProfile = async () => {  
        const jsonValue = await AsyncStorage.getItem('userprofile');
        const userProfile =  JSON.parse(jsonValue);  
        if (userProfile !== null) {
            setprofile(userProfile);
        }
        return userProfile;

    }

    //Hook
    useFocusEffect(
        React.useCallback(() => {
    //      alert('Screen was focused');
            getProfile().then((keyValue) => {
                //nothing
                
             });

            return () => {
            //   alert('Screen was unfocused');
            };
        }, [])
        );


        useEffect(() => {  
            getProfile().then((keyValue) => {
                //nothing
         });
      
        },[setprofile, profile]);
    
    return (
        
        
    <SafeAreaView>
        
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableHighlight 
                        onPress={() => navigation.navigate('Edit Profile')}
                        style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}>
                        <Image style={styles.avatar}
                            source={profilepic}/>
                    </TouchableHighlight>

                    <Text style={styles.name}>{profile.name} {profile.lastName}</Text>
                    
                    
                    <Text style={styles.userInfo}>{profile.email}</Text>
                    <Text style={styles.name}></Text>
                    <Text style={styles.name}></Text>
                </View>

            </View>
            <View style={{backgroundColor:"white",
                        height: Dimensions.get('window').height/8,
                        alignItems:'center',
                        justifyContent: 'center'}}>
                    <Text style={styles.name}>Reputation:</Text>
                    <CustomRatingBar/>
            </View>            
            <View style={styles.body}>
                <View style={styles.item}>
                    <View style={styles.iconContent}>
                        <FontAwesome name="history" size={24} color="black" />
                    </View>
                    <View style={styles.infoContent}>
                        <TouchableOpacity
                            onPress={() => {navigation.navigate("MyTrips");}}
                        >
                            <Text
                                numberOfLines={1}
                                adjustsFontSizeToFit ={true}                           
                                style={styles.info}>My Trips</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.item}>
                    <View style={styles.iconContent}>
                        <AntDesign name="wallet" size={24} color="black" />
                    </View>
                    <View style={styles.infoContent}>
                        <TouchableOpacity
                            onPress={() => {navigation.navigate("SearchUser");}}
                        >
                            <Text
                                style={styles.info} >My Wallet</Text>
                        </TouchableOpacity>
                    </View>
                </View>

               
            </View>
        </View> 
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1

    },
    header:{
        //backgroundColor: "#DCDCDC",
        backgroundColor: "#fff",
        height: Dimensions.get('window').height/3,
        
},
    headerContent:{
        padding:30,
        alignItems: 'center',
    },
    avatar: {
        width: Dimensions.get('window').width/4,
        height: Dimensions.get('window').width/4,
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
        height:Dimensions.get('window').height/4,
        alignItems:'center',
        justifyContent: 'center'
    },
    item:{
        flexDirection : 'row',
        alignItems: 'center',
        paddingLeft: "10%"
        //height:1
        
    },
    infoContent:{
        flex:1,
        alignItems:'flex-start',
        paddingRight:Dimensions.get('window').width/1.5,
        
        //width:400
    },
    iconContent:{
        flex:1,
        alignItems:'flex-start',
        //paddingRight:5,
        paddingLeft:10,
        paddingTop:20

    },
    icon:{
        width:30,
        height:30,
        marginTop:20,
        alignItems: 'flex-start'
    },
    info:{
        fontSize:Dimensions.get('window').width * 0.05,
        marginTop:20,
        color: "#000000",
        alignItems: 'flex-start',
        width: Dimensions.get('window').width,        
        //paddingRight: 100,
    },
    customBar: {
        justifyContent: 'center',
        flexDirection: 'row',
       //marginTop: 30,
      },
      StarImage: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
      },
});

export default UserProfile;