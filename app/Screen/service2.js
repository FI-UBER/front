import axios from "axios";
import { TRIP_URL } from '@env'


const price_trip = async (distance) => {
    
    try {
        console.log(distance)
        const response = await axios.get(
            `${TRIP_URL}/trip-price?distance=${distance}`
        );
        //const { price } = response.data; 
        //console.log(response.data)
        return response.data;
    } catch (error) {
        // Mostrar los errores relevantes al usuario.
        // Los mensajes de error deberian usar un lenguaje 
        // que el usuario comprenda. 
        // Mostrar los mensajes de error del back, 
        // unicamente si son humanamente legibles.
        const message = (error.response?.data?.error
            // || error.message
            || 'Service is not available at the moment')
        console.error(message);
        throw new Error(message)
    }
}

export default price_trip;
