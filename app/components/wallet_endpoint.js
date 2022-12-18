import axios from "axios";
import { GATEWAY } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';

const _getProfile = async () => {  
    const jsonValue = await AsyncStorage.getItem('userprofile');
    const userProfile =  JSON.parse(jsonValue);  
    return userProfile;
}

const pay = async (monto) => {
    _getProfile().then((keyValue) => {
        var credentials = ({privateKey: keyValue.WalletPrivateKey, amountInEthers: monto.toString()})   
        _recivePayFromContract(credentials)     
     });
}

const deposit = async (monto) => {
    _getProfile().then((keyValue) => {
        var credentials = ({privateKey: keyValue.WalletPrivateKey, amountInEthers: monto.toString()})   
        console.log(credentials)
        _depositToContract(credentials)     
     });
}

const _depositToContract = async (data) => {
        console.log( `${GATEWAY}/api/v1/deposit?privateKey=${data.privateKey}&amountInEthers=${data.amountInEthers}`)
        axios.post( `${GATEWAY}/api/v1/deposit?privateKey=${data.privateKey}&amountInEthers=${data.amountInEthers}`
            // {headers: {
            //     'Content-Type' : 'application/json'}}
        )
        .then((response) =>{
            console.log(response.data)
            return response.data;
        }).catch((error) => {
            const message = (error.response?.data?.error
                || error.message)
              // || 'Service is not available at the moment')
           console.error(message);
           throw new Error(message)
       })
}


const _recivePayFromContract = async (data) => {

    axios.post( `${GATEWAY}/api/v1/pay?privateKey=${data.privateKey}&amountInEthers=${data.amountInEthers}`
        // {headers: {
        //     'Content-Type' : 'application/json'}}
    )
    .then((response) =>{
        console.log(response.data)
        return response.data;
    }).catch((error) => {
        const message = (error.response?.data?.error
            || error.message)
          // || 'Service is not available at the moment')
       console.error(message);
       throw new Error(message)
   })
}

const walletBalance = async (p_key) => {
    // try {
        //console.log(`${GATEWAY}/balance/${p_key}`)    
    
        const response =await axios.get( `${GATEWAY}/api/v1/balance/${p_key}`)
        return response.data;
    // {
    //     client_id: id,
    // )} 
    // } catch (error) {
    //     const message = (error.response?.data?.error
    //         // || error.message
    //         || 'Service is not available at the moment')
    //     //console.error(message);
    //     return {email:"none"}
    // }
}


export { walletBalance, deposit, pay};
