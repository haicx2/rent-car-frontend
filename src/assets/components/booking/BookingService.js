import {api} from '../utils/api.js';

export async function bookingService(carId, customerId, bookingRequest) {
    if (!carId || !customerId || !bookingRequest) {
        console.error("Missing required parameters for bookingService.");
        throw new Error("carId, customerId, and bookingRequest are required.");
    }

    try {
        const result = await api.post(
            `/booking/add?carId=${carId}&customerId=${customerId}`,
            bookingRequest
        );
        console.log("The result from bookingService:", result);
        return result.data; // Adjust to `return result` if more details are needed
    } catch (error) {
        console.error("Booking service failed:", error);
        throw error;
    }

}