import axios from 'axios';
import { baseUrl } from '../constants/url.constants';

export const register = (userData) => {
    return axios.post(`${baseUrl}/user/register`, userData);
};

export const login = (userData) => {
    return axios.post(`${baseUrl}/user/login`, userData);
};
