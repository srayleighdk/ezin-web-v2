import Axios from 'axios';
import { baseURL } from '../../utils/config';
console.log('baseURL', baseURL)
const eZinApi = Axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    Accept: '*/*',
  },
});

export default eZinApi;
