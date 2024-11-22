import {useEffect, useState} from "react";
import UseMessageAlerts from "../hook/UserMessageAlert.js";
import {deleteUser, getUser} from "./UserService.js";
import {formatBookingStatus} from "../utils/utils.js";
import {Card, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import AlertMessage from "../common/AlertMessage.jsx";
import UserProfile from "./UserProfile.jsx";
import Review from "../review/Review.jsx";
import NoDataAvailable from "../common/NoDataAvailable.jsx";
import UserBooking from "../booking/UserBooking.jsx";
import CustomPieChart from "../chart/CustomPieChart.jsx";

export default function UserDashBoard() {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [bookingData, setBookingData] = useState([]);
    const [activeKey, setActiveKey] = useState(() => {
        const storedActiveKey = localStorage.getItem("activeKey");
        return storedActiveKey ? storedActiveKey : "profile";
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

    // const { userId } = useParams();
    const userId = 3;

    useEffect(() => {
        const getUserById = async () => {
            try {
                const data = await getUser(userId);
                setUser(data.data);
                setBookings(data.data.bookingDtos);
                console.log("The user data from the dashboard:", data.data);
            } catch (error) {
                setErrorMessage(error.response.data.message);
                setShowErrorAlert(true);
                console.error(error.message);
            }
        };
        getUserById();
    }, [userId]);

    useEffect(() => {
        if (user && user.bookingDtos) {
            const statusCounts = user.bookingDtos.reduce((acc, booking) => {
                const formattedStatus = formatBookingStatus(booking.status);
                if (!acc[formattedStatus]) {
                    acc[formattedStatus] = {
                        name: formattedStatus,
                        value: 1,
                    };
                } else {
                    acc[formattedStatus].value += 1;
                }
                return acc;
            }, {});

            const transformedData = Object.values(statusCounts);
            setBookingData(transformedData);
            console.log("Transformed booking data:", transformedData);
        }
    }, [user]);


    const handleDeleteAccount = async () => {
        try {
            const response = await deleteUser(userId);
            setSuccessMessage(response.message);
            setShowSuccessAlert(true);
        } catch (error) {
            setErrorMessage(error.message);
            setShowErrorAlert(true);
            console.error(error.message);
        }
    };

    const handleTabSelect = (key) => {
        setActiveKey(key);
        localStorage.setItem("activeKey", key);
    };

    return (
        <Container className='mt-2 user-dashboard'>
            {showErrorAlert && (
                <AlertMessage type={"danger"} message={errorMessage} />
            )}

            {showSuccessAlert && (
                <AlertMessage type={"success"} message={successMessage} />
            )}
            <Tabs
                className='mb-2'
                justify
                activeKey={activeKey}
                onSelect={handleTabSelect}>
                <Tab eventKey='profile' title={<h3>Profile</h3>}>
                    {user && (
                        <UserProfile
                            user={user}
                            handleDeleteAccount={handleDeleteAccount}
                        />
                    )}
                </Tab>
                <Tab eventKey='status' title={<h3>Bookings</h3>}>
                    <Row>
                        <Col>
                            {bookingData && bookingData.length > 0 ? (
                                <CustomPieChart data={bookingData} />
                            ) : (
                                <NoDataAvailable dataType={"booking data"} />
                            )}
                        </Col>
                    </Row>
                </Tab>

                <Tab eventKey='bookings' title={<h3>Booking Details</h3>}>
                    <Row>
                        <Col>
                            {user && (
                                <>
                                    {bookings && bookings.length > 0 ? (
                                        <UserBooking user={user} bookings={bookings} />
                                    ) : (
                                        <NoDataAvailable dataType={"booking data"} />
                                    )}
                                </>
                            )}
                        </Col>
                    </Row>
                </Tab>

                <Tab eventKey='reviews' title={<h3>Reviews</h3>}>
                    <Container className='d-flex justify-content-center align-items-center'>
                        <Card className='mt-5 mb-4 review-card'>
                            <h4 className='text-center mb-2'>Your Reviews</h4>
                            <hr />
                            <Row>
                                <Col>
                                    {user && user.reviewDtos && user.reviewDtos.length > 0 ? (
                                        user.reviewDtos.map((review, index) => (
                                            <Review key={index} review={review} />
                                        ))
                                    ) : (
                                        <NoDataAvailable dataType={"review data"} />
                                    )}
                                </Col>
                            </Row>
                        </Card>
                    </Container>
                </Tab>
            </Tabs>
        </Container>
    )
}