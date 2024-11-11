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