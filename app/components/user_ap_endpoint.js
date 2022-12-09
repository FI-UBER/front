import axios from "axios";
import { USERS_URL, WALLETURL } from '@env'
import {currentSession} from '../context'


const data_update = async (credentials) => {
    //const context = currentSession();
    var type = credentials.rol
    console.log(credentials)
    var response;
    try {
        if (type == "passenger") {
            console.log(type)
            response = await axios.put
                (`${USERS_URL}/passengers`, credentials
            );
        }
        else {
            response = await axios.put
                (`${USERS_URL}/drivers`, credentials
            );
        }
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
        
             || error.message)
           // || 'Service is not available at the moment')
        
        console.error(message);
        throw new Error(message)
    }
}

const getData = async (credentials, rol) => {
    console.log(credentials)
    var response;
    try {
        if (credentials.rol === "passenger") {
            console.log("entre")
            response = await axios.post
            //(baseURL,{distance: distance}
                (`${USERS_URL}/passenger/data`, credentials
            );
        }
        else {
            response = await axios.post
            //(baseURL,{distance: distance}
                (`${USERS_URL}/driver/data`, credentials
            );
        }
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
        
            // || error.message
            || 'Service is not available at the moment')
        
        console.error(message);
        throw new Error(message)
    }
}


const register_passenger = async (credentials, rol) => {
    var response;
    try {
        if (rol == "Passenger") {
            response = await axios.post
            //(baseURL,{distance: distance}
                (`${USERS_URL}/passengers`, credentials
            );
        }
        else {
            response = await axios.post
            //(baseURL,{distance: distance}
                (`${USERS_URL}/drivers`, credentials
            );
        }
        console.log(response.data)
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
        
            // || error.message
            || 'Service is not available at the moment')
        
        console.error(message);
        throw new Error(message)
    }
}

const check_passenger_atLogin = async (credentials) => {
    try {  
        const response =await axios.post( `${USERS_URL}/passenger/email`, credentials )
        
        return response.data;
    // {
    //     client_id: id,
    // )} 
    } catch (error) {
        const message = (error.response?.data?.error
            // || error.message
            || 'Service is not available at the moment')
        //console.error(message);
        return {email:"none"}
    }
}


const walletBalance = async (p_key) => {
    // try {
        //console.log(`${WALLETURL}/balance/${p_key}`)    
    
        const response =await axios.get( `${WALLETURL}/balance/${p_key}`)
        console.log(response.data)
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


export {register_passenger, check_passenger_atLogin, walletBalance, getData, data_update};
