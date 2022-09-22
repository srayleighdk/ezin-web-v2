import Axios from 'axios';
import { baseURL } from '../../utils/config';

const eZinApi = Axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    Accept: '*/*',
  },
});

export default eZinApi;
