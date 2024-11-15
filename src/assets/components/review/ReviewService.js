import {api} from "../utils/api.js";

export async function addReview(carId, customerId, reviewData) {
    try {
        const response = await api.post(
            `/review/add?customerId=${customerId}&carId=${carId}`,
            reviewData
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}