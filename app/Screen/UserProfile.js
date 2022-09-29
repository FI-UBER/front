import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView
} from 'react-native';
import profilepic from '../assets/profilepic.jpg'
import messages from '../assets/conversaciones.png'
import config from '../assets/config.png'
import FIFI from '../assets/FIFIUBA.png'

//export default class UserProfileView extends Component {

    const UserProfile = () => {
    return (
    <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                    source={profilepic}/>

                    <Text style={styles.name}>Juan Pérez </Text>
                    <Text style={styles.userInfo}>juanperez@mail.com </Text>
                    <Text style={styles.userInfo}>Buenos Aires, Argentina </Text>
                </View>
            </View>

            <View style={styles.body}>
                <View style={styles.item}>
                    <View style={styles.iconContent}>
                        <Image style={styles.icon} source={FIFI}/>
                    </View>
                    <View style={styles.infoContent}>
                        <Text style={styles.info}>Mis viajes</Text>
                    </View>
                </View>

                <View style={styles.item}>
                    <View style={styles.iconContent}>
                        <Image style={styles.icon} source={profilepic}/>
                    </View>
                    <View style={styles.infoContent}>
                        <Text style={styles.info}>Buscar un usuario</Text>
                    </View>
                </View>

                <View style={styles.item}>
                    <View style={styles.iconContent}>
                        <Image style={styles.icon} source={messages}/>
                    </View>
                    <View style={styles.infoContent}>
                        <Text style={styles.info}>Mis conversaciones</Text>
                    </View>
                </View>

                <View style={styles.item}>
                    <View style={styles.iconContent}>
                        <Image style={styles.icon} source={config}/>
                    </View>
                    <View style={styles.infoContent}>
                        <Text style={styles.info}>Configuración</Text>
                    </View>
                </View>

            </View>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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