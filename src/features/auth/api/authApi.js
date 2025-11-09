import { httpClient } from "../../../shared/api/httpClient";

export const authApi = {
    login: async (data) => {
        console.log(`login ${data}`);
        console.log(await httpClient('/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify(data)
        }));
    },
    register: async (data) => {
        console.log(`register ${data}`);
        httpClient('/api/v1/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    logout: async () => {
        httpClient('/api/v1/auth/logout', {
            method: 'POST'
        });
    }
}