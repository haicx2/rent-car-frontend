import { Button, Container, Form, InputGroup } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage.jsx";
import UseMessageAlerts from "../hook/UserMessageAlert.js";
import { useEffect, useState } from "react";
import { getCarById, updateCarPhoto } from "./CarService.js";
import { useParams } from "react-router-dom";

export default function CarUploadImage() {
    const [file, setFile] = useState(null);
    const [car, setCar] = useState(null);
    const { carId } = useParams();

    const {
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
        showSuccessAlert,
        setShowSuccessAlert,
        showErrorAlert,
        setShowErrorAlert,
    } = UseMessageAlerts();

    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);
            setErrorMessage(""); // Clear error if file is valid
        } else {
            setErrorMessage("Please select a valid image file.");
            setShowErrorAlert(true);
        }
    };

    // Fetch car details
    const getCar = async () => {
        try {
            const result = await getCarById(carId);
            setCar(result.data);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Failed to fetch car details");
            setShowErrorAlert(true);
        }
    };

    useEffect(() => {
        getCar();
    }, [carId]);

    // Handle image upload
    const handleImageUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setErrorMessage("No file selected for upload.");
            setShowErrorAlert(true);
            return;
        }

        try {
            const response = await updateCarPhoto(carId, file);
            setSuccessMessage("Photo uploaded successfully!");
            setCar((prevCar) => ({
                ...prevCar,
                photoUrl: response.data.photoUrl, // Update the image dynamically
            }));
            setShowSuccessAlert(true);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Failed to upload photo");
            setShowErrorAlert(true);
        }
    };

    useEffect(() => {
        if (showSuccessAlert || showErrorAlert) {
            const timeout = setTimeout(() => {
                setShowSuccessAlert(false);
                setShowErrorAlert(false);
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [showSuccessAlert, showErrorAlert]);

    return (
        <Container>
            {/* Alert Messages */}
            {showErrorAlert && <AlertMessage type="danger" message={errorMessage} />}
            {showSuccessAlert && <AlertMessage type="success" message={successMessage} />}

            <Form onSubmit={handleImageUpload}>
                <h6>Select the photo you would like to display on your profile</h6>
                <InputGroup>
                    <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    <Button variant="secondary" type="submit">
                        Upload
                    </Button>
                </InputGroup>
            </Form>

        </Container>
    );
}
