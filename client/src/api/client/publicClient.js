import axios from 'axios';
import queryString from 'query-string';

const baseURL = 'https://movienest-rti2.onrender.com/api/v1/'; //RENDER
// const baseURL = 'https://movienestv2-production.up.railway.app/api/v1/'; //RAILWAY

const publicClient = axios.create({
    baseURL,
    paramsSerializer: { encode: (params) => queryString.stringify(params) },
});

publicClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
        },
    };
});

publicClient.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data;
        return response;
    },
    (err) => {
        throw err.response.data;
    }
);

export default publicClient;
