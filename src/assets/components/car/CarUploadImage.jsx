import {Button, Container, Form, InputGroup, Modal} from "react-bootstrap";
import AlertMessage from "../common/AlertMessage.jsx";
import UseMessageAlerts from "../hook/UserMessageAlert.js";
import {useEffect, useState} from "react";
import {getCarById, updateCarPhoto} from "./CarService.js";
import {useParams} from "react-router-dom";

export default function CarUploadImage({carId, show, handleClose}) {
    const [file, setFile] = useState(null);
    const [car, setCar] = useState(null);

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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Upload a Photo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {showErrorAlert && (
                    <AlertMessage type={"danger"} messsag={errorMessage}/>
                )}
                {showSuccessAlert && (
                    <AlertMessage type={"success"} messsag={successMessage}/>
                )}

                <Form>
                    <h6>Select the photo you would like to display on your profile</h6>
                    <InputGroup>
                        <Form.Control type='file' onChange={handleFileChange}/>
                        <Button variant='secondary' onClick={handleImageUpload}>
                            Upload
                        </Button>
                    </InputGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
