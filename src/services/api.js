import axios from "axios";

const URL = "//api.olhovivo.sptrans.com.br/v2.1";

export default {
  async getBus(searchTerm) {
    const response = await axios.get(`${URL}/Linha/Buscar?${searchTerm}`);
    return response.data;
  },
  async getBusStop(searchTerm) {
    const response = await axios.get(
      `${URL}/Parada/Buscar?termosBusca=${searchTerm}`
    );
    return response.data;
  },
  async getEstimatedTime(searchTerm) {
    const response = await axios.get(
      `${URL}/Previsao?codigoParada=${searchTerm.busstop}&codigoLinha=${searchTerm.bus}`
    );
    return response.data;
  },
  async postLogin(token) {
    try {
      const response = await axios.post(
        `${URL}/Login/Autenticar?token=${token}`
      );
      return response;
    } catch (error) {
      return error;
    }
  }
};
