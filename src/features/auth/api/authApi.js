import { User } from "../../../entities/user";

export const authApi = {
    login: async ({ email, password }) => {
        console.log(`login ${email} ${password}`);
        return new User({ 
            email, 
            password
        });
    },
    register: async ({ email, password }) => {
        console.log(`register ${email} ${password}`);
        return new User({ 
            email, 
            password
        });
    },
    logout: async ({ email }) => {
        console.log(`login ${email}`);
        return true;
    }
}