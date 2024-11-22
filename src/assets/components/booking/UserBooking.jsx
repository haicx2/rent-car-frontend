import { useEffect, useState } from "react";
import useColorMapping from "../hook/ColorMapping.js";
import UseMessageAlerts from "../hook/UserMessageAlert.js";
import { approveBooking, declineBooking, getBookingById, cancelBooking, completeBooking } from "./BookingService.js";
import { Accordion, Container, Row, Col } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage.jsx";
import BookingFilter from "./BookingFilter.jsx";
import { formatBookingStatus } from "../utils/utils.js";
import Paginator from "../common/Paginator.jsx";

export default function UserBooking({ user, bookings: initialBookings }) {
    const [bookings, setBookings] = useState(initialBookings);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(4);

    const colors = useColorMapping();

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

    const fetchBooking = async (bookingId) => {
        try {
            const response = await getBookingById(bookingId);
            const updatedBooking = response.data;
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === updatedBooking.id ? updatedBooking : booking
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (initialBookings) {
            setFilteredBookings(initialBookings);
        }
    }, [initialBookings]);

    const handleApproveBooking = async (bookingId) => {
        try {
            const response = await approveBooking(bookingId);
            setSuccessMessage(response.message);
            setShowSuccessAlert(true);
            fetchBooking(bookingId);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setShowErrorAlert(true);
        }
    };

    const handleDeclineBooking = async (bookingId) => {
        try {
            const response = await declineBooking(bookingId);
            setSuccessMessage(response.message);
            setShowSuccessAlert(true);
            fetchBooking(bookingId);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setShowErrorAlert(true);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            const response = await cancelBooking(bookingId);
            setSuccessMessage(response.message);
            setShowSuccessAlert(true);
            fetchBooking(bookingId);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setShowErrorAlert(true);
        }
    };

    const handleCompleteBooking = async (bookingId) => {
        try {
            const response = await completeBooking(bookingId);
            setSuccessMessage(response.message);
            setShowSuccessAlert(true);
            fetchBooking(bookingId);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setShowErrorAlert(true);
        }
    };

    const handleClearFilter = () => {
        setSelectedStatus("all");
    };

    const statuses = Array.from(new Set(bookings.map((booking) => booking.status)));

    useEffect(() => {
        let filter = bookings;
        if (selectedStatus && selectedStatus !== "all") {
            filter = bookings.filter((booking) => booking.status === selectedStatus);
        }
        setFilteredBookings(filter);
    }, [selectedStatus, bookings]);

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;

    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    return (
        <Container className="p-3">
            {showSuccessAlert && <AlertMessage type="success" message={successMessage} />}
            {showErrorAlert && <AlertMessage type="danger" message={errorMessage} />}

            <BookingFilter
                onClearFilters={handleClearFilter}
                statuses={statuses}
                onSelectStatus={setSelectedStatus}
            />

            <Accordion className="mt-4 mb-5">
                {currentBookings.map((booking, index) => {
                    const formattedStatus = formatBookingStatus(booking.status);
                    const statusColor = colors[formattedStatus] || colors["default"];

                    const isWaitingForApproval = formattedStatus === "waiting-for-approval";
                    const isApproved = formattedStatus === "approved";

                    return (
                        <Accordion.Item eventKey={index} key={index} className="mb-4">
                            <Accordion.Header>
                                <div>
                                    <div className="mb-3">Date: {booking.bookingDate}</div>
                                    <div style={{ color: statusColor }}>Status: {formattedStatus}</div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Row className="mb-4">
                                    <Col md={4}>
                                        <p>Booking Number: {booking.bookingNo}</p>
                                        <p>Car: {booking.carName}</p>
                                        <p>Reason: {booking.reason}</p>
                                    </Col>
                                </Row>
                                {user.role === "CUSTOMER" && (
                                    <div>
                                        <button
                                            onClick={() => handleCancelBooking(booking.id)}
                                            disabled={!isWaitingForApproval}
                                            className="btn btn-danger"
                                        >
                                            Cancel Booking
                                        </button>
                                        <button
                                            onClick={() => handleCompleteBooking(booking.id)}
                                            disabled={!isApproved}
                                            className="btn btn-success ms-2"
                                        >
                                            Mark as Complete
                                        </button>
                                    </div>
                                )}
                                {user.role === "OWNER" && (
                                    <div>
                                        <button
                                            onClick={() => handleApproveBooking(booking.id)}
                                            disabled={!isWaitingForApproval}
                                            className="btn btn-success"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleDeclineBooking(booking.id)}
                                            disabled={!isWaitingForApproval}
                                            className="btn btn-danger ms-2"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                    );
                })}
            </Accordion>

            <Paginator
                itemsPerPage={bookingsPerPage}
                totalItems={filteredBookings.length}
                paginate={setCurrentPage}
                currentPage={currentPage}
            />
        </Container>
    );
}
