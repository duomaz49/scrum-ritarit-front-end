import axios from 'axios';

export const setupAxiosInterceptors = (
    showLoading: () => void,
    hideLoading: () => void
): void => {
    axios.interceptors.request.use(
        (config) => {
            showLoading();
            return config;
        },
        (error) => {
            hideLoading();
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            hideLoading();
            return response;
        },
        (error) => {
            hideLoading();
            return Promise.reject(error);
        }
    );
};