
import axios from "axios";
import {REACT_APP_API_URL} from '@env'
import { TRIPS } from '@env'

const login = async (credentials) => {
    try {
        const response = await axios.post(
            `${REACT_APP_API_URL}/api/login`,
            credentials
        );
        console.log(response.data)
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

export default login;
