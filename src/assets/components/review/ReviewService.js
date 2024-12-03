import {api} from "../utils/api.js";

export async function addReview(carId, customerId, reviewData) {
    try {
        const token = localStorage.getItem("authToken")
        const response = await api.post(
            `/review/add?customerId=${customerId}&carId=${carId}`,
            reviewData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}