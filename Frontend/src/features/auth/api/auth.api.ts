import api from '../../../shared/api/axios';
import { LoginData, AuthResponse } from '../types';

export const login = async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/login', data);
    return response.data;
};

export const register = async (data: any) => {
    const response = await api.post('/register', data);
    return response.data;
};