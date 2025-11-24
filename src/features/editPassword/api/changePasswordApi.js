import { httpClient } from "../../../shared/api/httpClient";

export const changePasswordApi = {
    changePassword: async (data) => {
        return await httpClient('/api/v1/auth/password', {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
    }
};