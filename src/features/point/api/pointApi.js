import { httpClient } from "../../../shared/api/httpClient";

export const pointApi = {
    getPoints: async () => {
        return await httpClient('/api/v1/point', {
            method: 'GET'
        });
    },
    addPoints: async (data) => {
        return await httpClient('/api/v1/point', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },
    deletePoints: async (data) => {
        return await httpClient('/api/v1/point', {
            method: 'DELETE',
            body: JSON.stringify(data)
        });
    }
}