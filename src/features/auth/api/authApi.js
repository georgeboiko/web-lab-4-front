import { httpClient } from "../../../shared/api/httpClient";

export const authApi = {
    login: async (data) => {
        return await httpClient('/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    register: async (data) => {
        return await httpClient('/api/v1/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    logout: async () => {
        return await httpClient('/api/v1/auth/logout', {
            method: 'POST'
        });
    },
    getCurrentUser: async () => {
        return await httpClient('/api/v1/auth/me', {
             method: 'POST' 
        });
    }
};