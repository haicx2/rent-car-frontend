import {useState} from "react";
import UseMessageAlerts from "../hook/UserMessageAlert.js";
import {addCar} from "./CarService.js";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import ProcessSpinner from "../common/ProcessSpinner.jsx";
import AlertMessage from "../common/AlertMessage.jsx";

export default function CarAdd() {
    const userId = localStorage.getItem("userId");

    const [car, setCar] = useState({
        name: "BMW X5",
        color: "Gray",
        additionalFunction: "Parking Assist, Surround Sound System",
        address: "654 Spruce St, Chicago, IL",
        basePrice: 180.0,
        brand: "BMW",
        deposit: 600,
        description: "Luxury SUV with premium features and dynamic performance",
        fuelConsumption: 9.0,
        fuelType: "Diesel",
        licensePlate: "LUX8888",
        mileage: 15000,
        model: "X5 M50i",
        productionYear: 2022,
        seats: 5,
        termOfUse: "Daily, weekly, and monthly rental available",
        transmissionType: "Automatic",
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
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCar((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const response = await addCar(userId, car);
            setSuccessMessage(response.message);
            setShowSuccessAlert(true);
            setIsProcessing(false);
            handleReset();
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Registration failed");
            setShowErrorAlert(true);
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setCar({
            name: "",
            color: "",
            additionalFunction: "",
            address: "",
            basePrice: "",
            brand: "",
            deposit: "",
            description: "",
            fuelConsumption: "",
            fuelType: "",
            licensePlate: "",
            mileage: "",
            model: "",
            productionYear: "",
            seats: "",
            termOfUse: "",
            transmissionType: "",
        });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Form onSubmit={handleSubmit}>
                        <Card className="shadow mb-5">
                            <Card.Header className="text-center">
                                Car Registration Form
                            </Card.Header>
                            <Card.Body>
                                {/* Car Details */}
                                <Form.Group controlId="carName" className="mb-3">
                                    <Form.Label>Car Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={car.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter car name"
                                    />
                                </Form.Group>
                                <Form.Group controlId="carBrand" className="mb-3">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="brand"
                                        value={car.brand}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter car brand"
                                    />
                                </Form.Group>
                                <Form.Group controlId="carModel" className="mb-3">
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="model"
                                        value={car.model}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter car model"
                                    />
                                </Form.Group>
                                <Form.Group controlId="licensePlate" className="mb-3">
                                    <Form.Label>License Plate</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="licensePlate"
                                        value={car.licensePlate}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter license plate"
                                    />
                                </Form.Group>
                                <Form.Group controlId="productionYear" className="mb-3">
                                    <Form.Label>Production Year</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="productionYear"
                                        value={car.productionYear}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="basePrice" className="mb-3">
                                    <Form.Label>Base Price (per day)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="basePrice"
                                        value={car.basePrice}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                {/* Other details */}
                                <Form.Group controlId="color" className="mb-3">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="color"
                                        value={car.color}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="seats" className="mb-3">
                                    <Form.Label>Seats</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="seats"
                                        value={car.seats}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="description" className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        value={car.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder="Enter car description"
                                    />
                                </Form.Group>

                                {/* Action Buttons */}
                                <div className="d-flex justify-content-center mb-3">
                                    <Button
                                        type="submit"
                                        variant="outline-primary"
                                        size="sm"
                                        className="me-2"
                                        disabled={isProcessing}>
                                        {isProcessing ? (
                                            <ProcessSpinner message="Registering car..." />
                                        ) : (
                                            "Register"
                                        )}
                                    </Button>
                                    <Button variant="outline-info" size="sm" onClick={handleReset}>
                                        Reset
                                    </Button>
                                </div>

                                {/* Alerts */}
                                {showErrorAlert && <AlertMessage type="danger" message={errorMessage} />}
                                {showSuccessAlert && <AlertMessage type="success" message={successMessage} />}
                            </Card.Body>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}