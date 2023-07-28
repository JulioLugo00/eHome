import axios from "axios";

export default async function fetchExchangeRates(acronym: string) {
    try {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/${acronym}`);
      const data = response.data;
  
      // Aquí puedes manejar la respuesta de la API como desees
      console.log(data);
      return data;
    } catch (error) {
      // Manejo de errores
      console.error(error);
    }
}