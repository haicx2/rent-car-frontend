import {useState} from "react";
import UseMessageAlerts from "../hook/UserMessageAlert.js";
import {useParams} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import AlertMessage from "../common/AlertMessage.jsx";
import DatePicker from "react-datepicker";
import ProcessSpinner from "../common/ProcessSpinner.jsx";
import {bookingService} from "./BookingService.js";
import {format} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function Booking() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        startDate: null,
        endDate: null,
        paymentMethod: "",
    });

    const {
        successMessage,
        setSuccessMessage,
        showSuccessAlert,
        setShowSuccessAlert,
        errorMessage,
        setErrorMessage,
        showErrorAlert,
        setShowErrorAlert,
    } = UseMessageAlerts();

    const {carId} = useParams();
    const customerId = localStorage.getItem("userId");

    const handleDateChange = (field, date) => {
        setFormData((prevState) => ({
            ...prevState,
            [field]: date,
        }));
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const request = {
            startDate: format(formData.startDate, "yyyy-MM-dd"),
            endDate: format(formData.endDate, "yyyy-MM-dd"),
            paymentMethod: formData.paymentMethod,
        };

        setIsProcessing(true);
        try {
            const response = await bookingService(carId, customerId, request);
            setSuccessMessage(response.message || "Booking successful!");
            setShowSuccessAlert(true);
            handleReset();
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Booking failed.");
            setShowErrorAlert(true);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setFormData({
            startDate: "",
            endDate: "",
            paymentMethod: "",
        });
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col lg={6} md={8} sm={12}>
                    <Form onSubmit={handleSubmit}>
                        <Card className="shadow mb-5">
                            <Card.Header as="h5" className="text-center">
                                Car Booking Form
                            </Card.Header>
                            <Card.Body>
                                <Form.Group as={Row} className="mb-4">
                                    <Form.Label >Booking Start Date</Form.Label>
                                    <DatePicker
                                        selected={formData.startDate}
                                        onChange={(date) => handleDateChange("startDate", date)}
                                        dateFormat="yyyy-MM-dd"
                                        className="form-control"
                                        minDate={new Date()}
                                        placeholderText="Choose a start date"
                                        required
                                      showMonthYearDropdown/>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Booking End Date</Form.Label>
                                    <DatePicker
                                        selected={formData.endDate}
                                        onChange={(date) => handleDateChange("endDate", date)}
                                        dateFormat="yyyy-MM-dd"
                                        className="form-control"
                                        minDate={formData.startDate || new Date()}
                                        placeholderText="Choose an end date"
                                        required
                                     showMonthYearDropdown/>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Payment Method</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="paymentMethod"
                                        onChange={handleInputChange}
                                        value={formData.paymentMethod}
                                        placeholder="Enter payment method"
                                        required
                                    />
                                </Form.Group>

                                {showErrorAlert && (
                                    <AlertMessage type="danger" message={errorMessage}/>
                                )}

                                {showSuccessAlert && (
                                    <AlertMessage type="success" message={successMessage}/>
                                )}

                                <div className="d-flex justify-content-center mb-3">
                                    <Button
                                        type="submit"
                                        variant="outline-primary"
                                        size="sm"
                                        disabled={isProcessing}
                                        className="me-2"
                                    >
                                        {isProcessing ? (
                                            <ProcessSpinner message="Booking, please wait..."/>
                                        ) : (
                                            "Book Now"
                                        )}
                                    </Button>

                                    <Button
                                        variant="outline-info"
                                        size="sm"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}