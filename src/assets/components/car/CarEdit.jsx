import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import UseMessageAlerts from "../hook/UserMessageAlert.js";
import CarUploadImage from "./CarUploadImage.jsx";
import {editCar, getCarById} from "./CarService.js";
import AlertMessage from "../common/AlertMessage.jsx";
import ProcessSpinner from "../common/ProcessSpinner.jsx";

export default function CarEdit() {
    const navigate = useNavigate();
    const { carId } = useParams();

    const [isProcessing, setIsProcessing] = useState(false);

    const [car, setCar] = useState({
        name: "",
        brand: "",
        model: "",
        licensePlate: "",
        productionYear: 0,
        basePrice: 0,
        color: "",
        seats: 0,
        description: "",
    });

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

    useEffect(() => {
        const getCarData = async () => {
            try {
                const data = await getCarById(carId);
                setCar(data.data);
            } catch (error) {
                setErrorMessage(error.message);
                setShowErrorAlert(true);
            }
        };
        getCarData();
    }, [carId]);

    const handleCarInputChange = (e) => {
        const { name, value } = e.target;
        setCar((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCarUpdate = async (e) => {
        e.preventDefault();
        try {
            setIsProcessing(true);
            const response = await editCar(carId, car); // Update service usage
            console.log("The response from the update: ", response);
            setSuccessMessage(response.message);
            setShowSuccessAlert(true);
        } catch (error) {
            setErrorMessage(error.message);
            setShowErrorAlert(true);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCancelEdit = () => {
        navigate(`/car/carDetails/${carId}`);
    };

    const [showImageUploaderModal, setShowImageUploaderModal] = useState(false);

    const handleShowImageUploaderModal = () => {
        setShowImageUploaderModal(true);
    };

    const handleCloseImageUploaderModal = () => {
        setShowImageUploaderModal(false);
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Col md={6}>
                <Form onSubmit={handleCarUpdate}>
                    <Card className="shadow mb-5">
                        <Card.Header className="text-center mb-2">
                            Edit Car Information
                        </Card.Header>
                        <Card.Body>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Car Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={car.name}
                                    onChange={handleCarInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="brand" className="mb-3">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="brand"
                                    value={car.brand}
                                    onChange={handleCarInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="model" className="mb-3">
                                <Form.Label>Model</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="model"
                                    value={car.model}
                                    onChange={handleCarInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="licensePlate" className="mb-3">
                                <Form.Label>License Plate</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="licensePlate"
                                    value={car.licensePlate}
                                    onChange={handleCarInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="productionYear" className="mb-3">
                                <Form.Label>Production Year</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="productionYear"
                                    value={car.productionYear}
                                    onChange={handleCarInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="basePrice" className="mb-3">
                                <Form.Label>Base Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="basePrice"
                                    value={car.basePrice}
                                    onChange={handleCarInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="color" className="mb-3">
                                <Form.Label>Color</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="color"
                                    value={car.color}
                                    onChange={handleCarInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="seats" className="mb-3">
                                <Form.Label>Seats</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="seats"
                                    value={car.seats}
                                    onChange={handleCarInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="description" className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={car.description}
                                    onChange={handleCarInputChange}
                                />
                            </Form.Group>

                            {showErrorAlert && (
                                <AlertMessage type="danger" message={errorMessage} />
                            )}
                            {showSuccessAlert && (
                                <AlertMessage type="success" message={successMessage} />
                            )}

                            <div className="d-flex justify-content-center">
                                <Button
                                    type="submit"
                                    variant="outline-warning"
                                    size="sm"
                                    disabled={isProcessing}
                                    className="mx-2"
                                >
                                    {isProcessing ? (
                                        <ProcessSpinner message="Processing update..." />
                                    ) : (
                                        "Update"
                                    )}
                                </Button>
                                <Button
                                    variant="outline-info"
                                    size="sm"
                                    onClick={handleCancelEdit}
                                    className="mx-2"
                                >
                                    Back to Details
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Form>

                <Row>
                    <Card className="text-center mb-3 shadow">
                        <div className="text-center">
                            <p>
                                <Link to="#" onClick={handleShowImageUploaderModal}>
                                    Update Photo
                                </Link>
                            </p>
                            <CarUploadImage
                                carId={carId}
                                show={showImageUploaderModal}
                                handleClose={handleCloseImageUploaderModal}
                            />
                        </div>
                    </Card>
                </Row>
            </Col>
        </Container>
    );
}
