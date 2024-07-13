import axios from "axios";

const url = "http://localhost:5000";

export const fetchData = () => axios.post(`${url}/api/request-api`);

export const sendQuestion = (question) => axios.post(`${url}/api/questions`, question);

export const sendProductdata = (barcode) => axios.post(`${url}/scanner/productData`, barcode);

export const getIngredients = (ingredients, weights) => axios.post(`${url}/scanner/nutritionData`, {ingredients, weights});

export const userLogin = (formData) => axios.post(`${url}/users/login`, formData);

export const userSignUp = (formData) => axios.post(`${url}/users/signup`, formData);