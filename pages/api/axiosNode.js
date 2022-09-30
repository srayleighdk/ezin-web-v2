import Axios from 'axios';
import { baseURL } from '../../utils/config';

const eZinApiNode = Axios.create({
  // withCredentials: true,
  baseURL,
  headers: {
    Accept: '*/*',
    token: 'EzinWebApp@123'
    // 'Content-Type': 'application/json',
  },
});

export default eZinApiNode;