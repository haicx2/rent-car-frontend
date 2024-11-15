import {api} from "../utils/api.js";

export async function getUser(userId) {
    try {
        const result = await api.get(`/user/get/${userId}`);
        return result.data;
    } catch (error) {
        throw error;
    }
}