import axios, {AxiosResponse} from 'axios';

// Axios
const baseURL = `http://localhost:8081/api`;
const axiosInstance = axios.create({
    baseURL,
    timeout: 3000
});

axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response): AxiosResponse<void> => {

        console.log('response::', response);
        return response;
    },
    (error) => {
        if(error.response && error.response.status === 401) {
            localStorage.removeItem('info');
            location.reload();
            return;
        }
        Promise.reject(error);
    }
);

export {axiosInstance};