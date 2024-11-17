import {useState} from "react";
import UseMessageAlerts from "../hook/UserMessageAlert.js";
import {registerUser} from "./UserService.js";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import ProcessSpinner from "../common/ProcessSpinner.jsx";
import AlertMessage from "../common/AlertMessage.jsx";
import {Link} from "react-router-dom";
import {format} from "date-fns";

export default function UserRegistration() {
    const [user, setUser] = useState({
        nationalId: 0,
        name: "",
        birthday: null,
        phone: "",
        email: "",
        password: "",
        address: "",
        drivingLicense: "",
        wallet: 0,
        role: "",
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

    const handleDateChange = (field, date) => {
        setUser((prevState) => ({
            ...prevState,
            [field]: date ? format(date, 'yyyy-MM-dd') : null,
        }));
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const response = await registerUser(user);
            setSuccessMessage(response.message);
            setShowSuccessAlert(true);
            setIsProcessing(false);
            handleReset();
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setShowErrorAlert(true);
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setUser({
            nationalId: null,
            name: "",
            birthday: null,
            phone: "",
            email: "",
            password: "",
            address: "",
            drivingLicense: "",
            wallet: null,
            role: "",
        });
    };

    return (
        <Container className='mt-5'>
            <Row className='justify-content-center'>
                <Col xs={12} md={8} lg={6}>
                    <Form onSubmit={handleSubmit}>
                        <Card className='shadow mb-5'>
                            <Card.Header className='text-center'>
                                User Registration Form
                            </Card.Header>
                            <Card.Body>
                                <fieldset>
                                    <legend>Name & CCCD</legend>

                                    <Row>
                                        <Col xs={6} className='mb-2 mb-sm-0'>
                                            <Form.Control
                                                type='number'
                                                name='nationalId'
                                                placeholder='National Id'
                                                value={user.nationalId}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Control
                                                type='text'
                                                name='name'
                                                placeholder='Name'
                                                value={user.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Col>
                                    </Row>
                                </fieldset>
                                <Row>
                                    {/* Birthday Selector */}
                                    <Form.Group as={Row} controlId='birthday' className='mb-3'>
                                        <Col>
                                            <Form.Label>Birthday</Form.Label>
                                            <DatePicker
                                                selected={user.birthday}
                                                onChange={(date) => handleDateChange("birthday", date)}
                                                dateFormat="yyyy-MM-dd"
                                                className="form-control"
                                                placeholderText="Choose your birthday"
                                                required
                                                showMonthYearDropdown
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>


                                <fieldset>
                                    <legend>Contact Information</legend>
                                    <Row>
                                        <Col sm={6} className='mb-2 mb-sm-0'>
                                            <Form.Control
                                                type='email'
                                                name='email'
                                                required
                                                placeholder='...email address...'
                                                value={user.email}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Control
                                                type="text"
                                                name="phone"
                                                required
                                                placeholder="Enter your phone number"
                                                value={user.phone}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className='mb-2 mb-sm-0'>
                                            <Form.Control
                                                type='text'
                                                name='address'
                                                required
                                                placeholder='...your address...'
                                                value={user.address}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Control
                                                type='text'
                                                name='drivingLicense'
                                                required
                                                placeholder='Driving License'
                                                value={user.drivingLicense}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Control
                                            type='number'
                                            name='wallet'
                                            placeholder='Wallet'
                                            value={user.wallet}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Row>
                                </fieldset>

                                {/* Password */}
                                <Form.Group as={Row} controlId='password' className='mb-3'>
                                    <Col>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type='password'
                                            name='password'
                                            required
                                            placeholder='...set your password...'
                                            value={user.password}
                                            onChange={handleInputChange}
                                        />
                                    </Col>
                                </Form.Group>

                                {/* Account Type */}
                                <Form.Group as={Row} controlId='user-type' className='mb-3'>
                                    <Col>
                                        <Form.Label>Account Type</Form.Label>
                                        <Form.Control
                                            as='select'
                                            name='role'
                                            required
                                            value={user.role}
                                            onChange={handleInputChange}>
                                            <option value=''>...select account type...</option>
                                            <option value='OWNER'>I'm a Car Owner</option>
                                            <option value='CUSTOMER'>I just want to rent car</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                {/* Action Buttons */}
                                <div className='d-flex justify-content-center mb-3'>
                                    <Button
                                        type='submit'
                                        variant='outline-primary'
                                        size='sm'
                                        className='me-2'
                                        disabled={isProcessing}>
                                        {isProcessing ? (
                                            <ProcessSpinner message='Processing registration...'/>
                                        ) : (
                                            "Register"
                                        )}
                                    </Button>
                                    <Button
                                        variant='outline-info'
                                        size='sm'
                                        onClick={handleReset}>
                                        Reset
                                    </Button>
                                </div>

                                {/* Adjust column sizes for different screens */}
                                {showErrorAlert && (
                                    <AlertMessage type='danger' message={errorMessage}/>
                                )}
                                {showSuccessAlert && (
                                    <AlertMessage type='success' message={successMessage}/>
                                )}

                                <div className='text-center'>
                                    Registered already?{" "}
                                    <Link to={"/login"} style={{textDecoration: "none"}}>
                                        Login here
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}