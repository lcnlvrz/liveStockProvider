import axios from 'axios';
import { apiVersion, basePath } from './config';

const axiosInstance = axios.create({

    baseURL:`${ basePath }/api/${ apiVersion }`

});

export default axiosInstance;