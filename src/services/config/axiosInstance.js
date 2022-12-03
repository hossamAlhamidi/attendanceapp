import axios from 'axios'
export const baseUrl = 'localhost:8000/api'

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
    const { access } = JSON.parse(localStorage.getItem('user'));
    request.headers.Authorization = `Bearer ${access}` || '';
    return request;
  };
  
  const onRequestError = (error) => {
    return Promise.reject(error);
  };
  
  const onResponse = (response) => {
    return response;
  };
  
  const onResponseError = async (error) => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    const statusCode = error.response.status;
    // const originalRequest: any = error.config;
    if ((statusCode === 403 || statusCode === 401) && user) {
    //   let toastID = 'permisison-error';
    //   if (!toast.isActive(toastID)) {
    //     console.log('axios')
     
    //   }
      // window.localStorage.removeItem('user');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  };
  
  // https://axios-http.com/docs/interceptors
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  
  export default axiosInstance;