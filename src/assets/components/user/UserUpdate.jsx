import UseMessageAlerts from "../hook/UserMessageAlert.js";
import {useEffect, useState} from "react";
import {getUser, updateUser} from "./UserService.js";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import AlertMessage from "../common/AlertMessage.jsx";
import ProcessSpinner from "../common/ProcessSpinner.jsx";

export default function UserUpdate() {
    const [isProcessing, setIsProcessing] = useState(false);
    const { userId } = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        nationalId: 0,
        name: "",
        phone: "",
        address: "",
        drivingLicense: "",
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
        const getUserData = async () => {
            try {
                const data = await getUser(userId);
                setUserData(data.data);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        getUserData();
    }, [userId]);

    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUserUpdate = async (e) => {
        e.preventDefault();
        const updatedUserData = {
            nationalId: userData.nationalId,
            name: userData.name,
            phone: userData.phone,
            address: userData.address,
            drivingLicense: userData.drivingLicense,
        };
        try {
            setIsProcessing(true);
            const response = await updateUser(updatedUserData, userId);
            console.log("The response from the update: ",response);
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
        navigate(`/user-dashboard/${userId}/my-dashboard`);
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Col md={6}>
                <Form onSubmit={handleUserUpdate}>
                    <Card className="shadow mb-5">
                        <Card.Header className="text-center mb-2">
                            Update User Information
                        </Card.Header>
                        <Card.Body>
                            <Form.Group controlId="nationalId" className="mb-3">
                                <Form.Label>National ID</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="nationalId"
                                    value={userData.nationalId}
                                    onChange={handleUserInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleUserInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="phone" className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleUserInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="address" className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={userData.address}
                                    onChange={handleUserInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="drivingLicense" className="mb-3">
                                <Form.Label>Driving License</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="drivingLicense"
                                    value={userData.drivingLicense}
                                    onChange={handleUserInputChange}
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
                                    Back to profile
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Form>
            </Col>
        </Container>
    );
}