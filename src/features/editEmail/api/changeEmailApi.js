import { httpClient } from "../../../shared/api/httpClient";

export const changeEmailApi = {
    changeEmail: async (data) => {
        return await httpClient('/api/v1/auth/email', {
            method: 'PATCH',
            body: JSON.stringify(data)
        })
    }
};