import axios from "axios";
import { WALLETURL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';

const _getProfile = async () => {  
    const jsonValue = await AsyncStorage.getItem('userprofile');
    const userProfile =  JSON.parse(jsonValue);  
    return userProfile;
}

const pay = async (monto) => {
    _getProfile().then((keyValue) => {
        var credentials = JSON.stringify({privateKey: keyValue.WalletPrivateKey, amountInEthers: monto.toString()})   
        _recivePayFromContract(credentials)     
     });
}

const deposit = async (monto) => {
    _getProfile().then((keyValue) => {
        var credentials = JSON.stringify({privateKey: keyValue.WalletPrivateKey, amountInEthers: monto.toString()})   
        console.log(credentials)
        _depositToContract(credentials)     
     });
}

const _depositToContract = async (data) => {

        axios.post( `${WALLETURL}/deposit`, data,
            {headers: {
                'Content-Type' : 'application/json'}}
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

    axios.post( `${WALLETURL}/pay`, data,
        {headers: {
            'Content-Type' : 'application/json'}}
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
        //console.log(`${WALLETURL}/balance/${p_key}`)    
    
        const response =await axios.get( `${WALLETURL}/balance/${p_key}`)
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
