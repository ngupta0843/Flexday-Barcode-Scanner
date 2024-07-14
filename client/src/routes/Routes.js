import axios from "axios";

// base url
axios.defaults.baseURL = "http://localhost:5000";

// adding token to header for every req
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchData = () => axios.post(`/api/request-api`);

export const sendQuestion = (question) => axios.post(`/api/questions`, question);

export const sendProductdata = (barcode) => axios.post(`/scanner/productData`, barcode);

export const getIngredients = (ingredients, weights) => axios.post(`/scanner/nutritionData`, { ingredients, weights });

export const userLogin = (formData) => axios.post(`/users/login`, formData);

export const userSignUp = (formData) => axios.post(`/users/signup`, formData);
