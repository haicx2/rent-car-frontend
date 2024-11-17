import {api} from "../utils/api.js"

export async function getCars() {
    try {
        const result = await api.get("/car/get/allcars");
        console.log("The result ", result);
        console.log("The result data", result.data.data[0].name);
        return result.data;
    } catch (error) {
        throw error;
    }
}

export async function getCarById(carId) {
    try {
        const result = await api.get(`/car/get/${carId}`);
        console.log("The result ", result.data);
        return result.data;
    } catch (error) {
        throw error;
    }
}

export async function updateCarPhoto(carId, photoData) {
    try {
        const response = await api.put(
            `/update/image/${carId}`,
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

