import axios from "axios";
import { TRIP_URL } from '@env'


const price_trip = async (distance) => {
    
    try {
        const response = await axios.get(
            `${TRIP_URL}/trip-price?distance=${distance}`
        );
        //const { price } = response.data; 
        //console.log(response.data)
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
            // || error.message
            || 'Service is not available at the moment')
        console.error(message);
        throw new Error(message)
    }
}

const create_trip = async (id,price) => {
    try {  
        const response =await axios.post( `${TRIP_URL}/accept-client-trip?client_id=${id}&price=${price}` )
        
        return response.data;
    // {
    //     client_id: id,
    // )} 
    } catch (error) {
        const message = (error.response?.data?.error
            // || error.message
            || 'Service is not available at the moment')
        //console.error(message);
        throw new Error(message)
    }
}


const search_trip = async () => {
    try {  
        const response =await axios.get( `${TRIP_URL}/search-trip` )
        //console.log(response)
        return response.data;
    } catch (error) {
        //console.log(error.code);
        const message = (error.response?.data?.error
            // || error.message
            || 'No hay viajes libres')
        //console.error(message);
        throw new Error(message)
    }
}

const accept_driver = async (trip_id, driver_id) => {
    try {  
        const response =await axios.post( `${TRIP_URL}/accept-driver-trip?trip_id=${trip_id}&driver_id=${driver_id}`)
        //console.log(response)
        return response.data;
    } catch (error) {
        //console.log(error.code);
        const message = (error.response?.data?.error
            // || error.message
            || 'Error')
        //console.error(message);
        throw new Error(message)
    }
}


const client_has_a_driver = async (trip_id) => {
    try {  
        const response =await axios.post( `${TRIP_URL}/driver?trip_id=${trip_id}`)
        //console.log(response)
        return response.data;
    } catch (error) {
        //console.log(error.code);
        const message = (error.response?.data?.error
            // || error.message
            || 'Error')
        //console.error(message);
        throw new Error(message)
    }
}


export {price_trip, create_trip, search_trip, accept_driver, client_has_a_driver};
