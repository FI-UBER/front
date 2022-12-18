import axios from "axios";
import { USERS_URL, WALLETURL, GATEWAY } from '@env'
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
                (`${GATEWAY}/api/v1/passengers`, credentials
            );
        }
        else {
            response = await axios.put
                (`${USERS_URL}/api/v1/drivers`, credentials
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
        if (rol === "passenger") {
            console.log("entre")
            response = await axios.post
            //(baseURL,{distance: distance}
                (`${GATEWAY}/api/v1/passenger/data?email=${credentials.email}`
            );
        }
        else {
            response = await axios.post
            //(baseURL,{distance: distance}
                (`${GATEWAY}/api/v1/driver/data?email=${credentials.email}`
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
        if (rol == "passenger") {
            response = await axios.post
            //(baseURL,{distance: distance}
                (`${GATEWAY}/api/v1/passengers`, credentials
            );
        }
        else {
            response = await axios.post
            //(baseURL,{distance: distance}
                (`${GATEWAY}/api/v1/drivers`, credentials
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
        const response =await axios.get( `${GATEWAY}/api/v1/passenger/email?email=${credentials.email}`)
        
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



export {register_passenger, check_passenger_atLogin, getData, data_update};
