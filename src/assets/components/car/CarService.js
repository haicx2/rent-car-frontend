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

export async function updateCarPhoto(carId, file) {
    const formData = new FormData();
    formData.append("file", file); // Key matches @RequestParam("file")

    try {
        const response = await api.put(`/car/update/image/${carId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function addCar(ownerId, car) {
    try {
        const result = await api.post(`/car/add?ownerId=${ownerId}`, car);
        return result.data;
    } catch (error) {
        throw error;
    }

}

