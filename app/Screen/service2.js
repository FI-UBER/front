import axios from "axios";
import { TRPS } from '@env'


const price = async (credentials) => {
   try {
       const response = await axios.get(
           `http://127.0.0.1:7777/trip-price`,
           credentials
       );
       console.log(response)
       return response;
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

export default price;
