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

export async function getCarsByQuery(params = {}) {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = `/car/search${queryString ? `?${queryString}` : ""}`;

        const result = await api.get(url);
        console.log("Search result", result);
        return result.data;
    } catch (error) {
        console.error("Error fetching cars by query:", error);
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