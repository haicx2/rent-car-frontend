import {useEffect, useState} from "react";
import { format } from "date-fns";

export const useAlertWithTimeout = (
    initialVisibility = false,
    duration = 10000
) => {
    const [isVisible, setIsVisible] = useState(initialVisibility);

    useEffect(() => {
        let timer;
        if (isVisible) {
            timer = setTimeout(() => {
                setIsVisible(false);
            }, duration);
        }
        return () => clearTimeout(timer);
    }, [isVisible, duration]);

    return [isVisible, setIsVisible];
};

export const formatBookingStatus = (status) =>{
    return status.toLowerCase().replace(/_/g, "-");
}

