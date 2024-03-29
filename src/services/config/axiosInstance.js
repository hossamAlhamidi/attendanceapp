import axios from 'axios'
export const baseUrl = 'https://autoattendancebe-production.up.railway.app/api/'

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
    },
  });

  const onRequest = async (
    request
  ) => {
    // refresh the token if it's expired
    // if (tokenIsExpired()) {
    //   await refreshToken();
    // }
  
    // get the access token from LS
    const { token } = JSON.parse(localStorage.getItem('user')) || ""
    request.headers.Authorization = `Bearer ${token}` || '';
    return request;
  };

  // export const getUserTokens = () => {
  //   return JSON.parse(localStorage.getItem('user')) || {};
  // };
  
  const onRequestError = (error) => {
    return Promise.reject(error);
  };
  
  const onResponse = (response) => {
    return response;
  };
  
  const onResponseError = async (error) => {
    // const user = JSON.parse(localStorage.getItem('user'));
  
    // const statusCode = error.response.status;
    // const originalRequest: any = error.config;
    // if ((statusCode === 403 || statusCode === 401) && user) {
   
    // }
    return Promise.reject(error);
  };
  
  // https://axios-http.com/docs/interceptors
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  
  export default axiosInstance;