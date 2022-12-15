import axios from "axios";
import { TRIPS_URL } from '@env'

const price_trip = async (distance) => {
    try {
        const response = await axios.get
            (`${TRIPS_URL}/trip-price?distance=${distance}`
        );
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
            // || error.message
            || 'Service is not available at the moment')
        
        console.error(message);
        throw new Error(message)
    }
}

const create_trip = async (id,price,Olat,Olng,Dlat,Dlng,Oname, Dname) => {
    try {  
        const response =await axios.post
        ( `${TRIPS_URL}/accept-client-trip?client_id=${id}&price=${price}&user_lat=${Olat}&user_long=${Olng}&dest_lat=${Dlat}
        &dest_long=${Dlng}&starting_name=${Oname}&destination_name=${Dname}` )
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
            // || error.message
            || 'Service is not available at the moment')
        //console.error(message);
        throw new Error(message)
    }
}


const search_trip = async (id) => {
    try {  
        const response =await axios.get( `${TRIPS_URL}/search-trip/${id}` )
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
            // || error.message
            || 'No trips found')
        //console.error(message);
        throw new Error(message)
    }
}

const accept_driver = async (trip_id, driver_id, lat, lng) => {
    try {  
        const response =await axios.post
        ( `${TRIPS_URL}/accept-driver-trip?trip_id=${trip_id}&driver_id=${driver_id}&driver_lat=${lat}&driver_long=${lng}`)
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
            // || error.message
            || 'Error')
        //console.error(message);
        throw new Error(message)
    }
}


const client_has_a_driver = async (trip_id) => {
    try {  
        const response =await axios.post( `${TRIPS_URL}/driver?trip_id=${trip_id}`)
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
            // || error.message
            || 'Error')
        //console.error(message);
        throw new Error(message)
    }
}


const get_driver_pos = async (trip_id) => {
    try {  
        const response =await axios.get( `${TRIPS_URL}/trip-driver-position?trip_id=${trip_id}`)
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
            // || error.message
            || 'Error')
        //console.error(message);
        throw new Error(message)
    }
}

const update_driver_pos = async (trip_id,new_lat, new_lng) => {
    try {  
        const response =await axios.put( `${TRIPS_URL}/driver/position?trip_id=${trip_id}&driver_lat=${new_lat}&driver_long=${new_lng}`)
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
            // || error.message
            || 'Error')
        //console.error(message);
        throw new Error(message)
    }
}

const update_status = async (trip_id) => {
    try {  
        const response =await axios.put( `${TRIPS_URL}/init?trip_id=${trip_id}`)
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
            // || error.message
            || 'Error')
        //console.error(message);
        throw new Error(message)
    }
}

const get_status = async (trip_id) => {
    try {  
        const response =await axios.get( `${TRIPS_URL}/trip?trip_id=${trip_id}`)
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
            // || error.message
            || 'Error')
        //console.error(message);
        throw new Error(message)
    }
}

const finish_trip_ = async (trip_id) => {
    try {  
        const response =await axios.post( `${TRIPS_URL}/trip/finish/${trip_id}`)
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
            // || error.message
            || 'Error')
        //console.error(message);
        throw new Error(message)
    }
}

const getScoreUser = async (userId) => {
    try {  
        console.log(userId)
        const response =await axios.get( `${TRIPS_URL}/score/${userId}`)
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
             || error.message)
            //|| 'Error')
        //console.error(message);
        throw new Error(message)
    }
}

const ScoreAUser = async (user_id, trip_id, score) => {
    try {  
        const response =await axios.post( `${TRIPS_URL}/trip/${trip_id}/qualify/${user_id}/score/${score}`)
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
             || error.message)
            //|| 'Error')
        //console.error(message);
        throw new Error(message)
    }
}


//trip/canceled/{trip_id}
const cancelTrip = async (trip_id) => {
    try {  
        const response =await axios.post( `${TRIPS_URL}trip/canceled/${trip_id}`)
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
             || error.message)
            //|| 'Error')
        //console.error(message);
        throw new Error(message)
    }
}
///trips/history/{user_id}
const userHistory = async (user_id) => {
 //   console.log(`${TRIPS_URL}/trip/history/${user_id}`)
    try {  
        const response =await axios.get( `${TRIPS_URL}/trips/history/${user_id}`)
     //   console.log(response.data)
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.error
             || error.message)
            //|| 'Error')
        //console.error(message);
        throw new Error(message)
    }
}



export {price_trip, create_trip, search_trip, accept_driver,
        client_has_a_driver, update_driver_pos, get_driver_pos, 
        get_status, update_status, finish_trip_, getScoreUser,
        ScoreAUser, cancelTrip, userHistory};
