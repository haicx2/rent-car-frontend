import {api} from "../utils/api.js";

export async function updateCarPhoto(carId, photoData) {
    try {
        const response = await api.put(
            `/photos/photo/${carId}/update`,
            photoData,
            {
                headers: {
                    "Content-Type": "application/octet-stream",
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteUserPhoto(carId) {
    try {
        const response = await api.delete(
            `/car/photo/${carId}/delete`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}