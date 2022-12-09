//import SelectList from 'react-native-dropdown-select-list' //to_do agregar a readme
import {TextInput, View, StyleSheet, SafeAreaView, Pressable, Text, Image, ImageBackground,Dimensions} from 'react-native';
import React, { useRef, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import ccard from '../assets/credit.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Avatar, Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import { walletBalance } from '../components/wallet_endpoint';
//import { ImageBackground } from 'react-native-web';

function SearchUser({navigation}){

  const [profile,setprofile] = React.useState("");
  const [balance,setbalance] = React.useState("");
  const getProfile = async () => {  
    const jsonValue = await AsyncStorage.getItem('userprofile');
    const userProfile =  JSON.parse(jsonValue);  
    if (userProfile !== null) {
        setprofile(userProfile);
    }
    return userProfile;
}



const getBalanceUser = () => {
  getProfile().then(async(keyValue) => {
    await walletBalance(keyValue.WalletAdress).then((response) =>{
      setbalance(response.toFixed(8))
      })
    })
  }
  
  
   //Hook
   useFocusEffect(
    React.useCallback(() => {
 //      alert('Screen was focused');
       setCopied(false);
       setCopiedPK(false)
       
       getBalanceUser()
       return () => {
       //   alert('Screen was unfocused');
       };
    }, [])
    );
  const [hasCopied,setCopied] = useState(false)
  const [show, setShow] = useState(false)
  const [hasCopiedPK,setCopiedPK] = useState(false)

  var privateKey = profile.WalletPrivateKey
  var walletAddress = profile.WalletAdress
  

  const copyAToClipboard = async () => {
    await Clipboard.setStringAsync(walletAddress);
  };

  const onCopy = () => {
    if (!hasCopied){
      setCopied(!hasCopied)
      copyAToClipboard()
    }  
  }


  const copyPKToClipboard = async () => {
    await Clipboard.setStringAsync(privateKey);
  };

  const onCopyPK = () => {
    if (!hasCopiedPK){
      setCopiedPK(!hasCopiedPK)
      copyPKToClipboard()
      }
    }

  const showCredentials = () => {

    setShow(!show)
  }

  const sa =() => {

    return(
      <View style={{flex:2}}>
      <Card>
        <Card.Actions>
          <Button onPress={() => {onCopy()}}>{ !hasCopied ?"Copy" : "Copied"}</Button>
        </Card.Actions>
          <Card.Title title="Balance"  left={LeftContent}
            right={RightContent} />
          <Card.Content>
            <Paragraph style={styles.balance}>$ {balance} Ether</Paragraph>
          </Card.Content>
            <Card.Actions>
            <Button 
              onPress={() => {getBalanceUser()}}
              icon="update" 
              > Refresh</Button>
            </Card.Actions>
          
          <Card.Title title="Details"  left={LeftContent}
            right={(props) => <IconButton {...props} icon="information" onPress={() => {}} />}
            />
          <Card.Content>
            {/* <Paragraph style={styles.text}>Address:</Paragraph>
            <Paragraph style={styles.textData}> {!show ?"*******" : walletAddress}</Paragraph> */}
            <Paragraph style={styles.text}>PrivateKey:</Paragraph>
            <Paragraph style={styles.textData}> {!show ?"*******" : privateKey}</Paragraph>
            <Paragraph style={styles.text}></Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => {onCopyPK()}}>{ !hasCopiedPK ?"Copy" : "Copied"}</Button>
            <Button onPress={() => {showCredentials()}}>{ !show ?"Show Credentials" : "Hide Credentilas"}</Button>
          </Card.Actions>
        </Card> 
      </View>

    )
  }

    const LeftContent = props => <Avatar.Icon {...props} icon="credit-card-settings" />
    const RightContent = props => <IconButton {...props} icon="cash-check" onPress={() => {}}/>
    return (
      
      <View style={styles.container}>
        <ImageBackground
          source={ccard} resizeMode="contain" style={styles.image}>
             <View style={{
              position: 'absolute', 
              top: -(Dimensions.get("window").height/6), 
              left: 0, 
              right:0, 
              //Dimensions.get("window").width/500, 
              bottom: 0, 
              justifyContent: 'center', 
              alignItems: 'center'}}>
              <Text style={{
                adjustsFontSizeToFit: true,
                color:"white",
                fontSize: Dimensions.get('window').height* 0.025,

              }} >FIUBER Wallet</Text>
            </View> 

            <View style={{
              position: 'absolute', 
              top: (Dimensions.get("window").height/10), 
              left: 0, 
              right:0, 
              //Dimensions.get("window").width/500, 
              bottom: 0, 
              justifyContent: 'center', 
              alignItems: 'center'}}>
              <Text  
                // adjustsFontSizeToFit={true}
                // numberOfLines={1}
                style={{
                  color:"white",
                  fontSize: Dimensions.get('window').width* 0.025,
                }}
             >{!show ?"* * * * * * * * * * * * *" : walletAddress}</Text>
             
            </View> 

            <View style={{
              position: 'absolute', 
              top: Dimensions.get("window").height/5.3, 
              left: 0, 
              right:0, 
              //Dimensions.get("window").width/500, 
              bottom: 0, 
              justifyContent: 'center', 
              alignItems: 'center'}}>
              <Text style={{
                adjustsFontSizeToFit: true,
                color:"white",
                fontSize: Dimensions.get('window').height* 0.020,

              }} >{profile.name} {profile.lastName}</Text>
            </View> 
        </ImageBackground>
          {/* <Button 
                style ={styles.button}
                labelStyle={{
                  //fontSize:Dimensions.get('window').height* 0.02,
                }}
                icon="clipboard" 
                mode={"contained"}
                onPress= {onCopyPK}>
                { !hasCopiedPK ?"Copy" : "Copied"}
          </Button>         */}
        { true && sa()}
      </View>
    );

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: 'space-between',
    //alignItems: 'center',
  },
  copiedText: {
    marginTop: 10,
    color: 'red',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
    secureTextEntry: true
},
textData: {
  fontSize: 12,
  fontWeight: 'italic',
  margin: 5,
  textAlign: 'center',
  color: 'green',
  secureTextEntry: true
},
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  button: {
    width:"30%",
    margin:"5%",
    //height: Dimensions.get('window').height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    left: 0, 
    right:20, 
    position: 'absolute',
    top: 0,
     
  },
})

export default SearchUser;