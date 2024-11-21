import { useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal.jsx";
import { Link } from "react-router-dom";
import ChangePasswordModal from "../modals/ChangePasswordModal.jsx";
import Paginator from "../common/Paginator.jsx";


export default function UserProfile({ user, handleDeleteAccount }) {
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Set number of cars per page

    const handleShowChangePasswordModal = () => {
        setShowChangePasswordModal(true);
    };
    const handleCloseChangePasswordModal = () => {
        setShowChangePasswordModal(false);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteAndCloseModal = async () => {
        try {
            await handleDeleteAccount();
            setShowDeleteModal(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    // Pagination logic
    const totalCars = user.carDtos?.length || 0;
    const indexOfLastCar = currentPage * itemsPerPage;
    const indexOfFirstCar = indexOfLastCar - itemsPerPage;
    const currentCars = user.carDtos?.slice(indexOfFirstCar, indexOfLastCar) || [];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container>
            <DeleteConfirmationModal
                show={showDeleteModal}
                onHide={handleCloseDeleteModal}
                onConfirm={handleDeleteAndCloseModal}
                itemToDelete={"user account"}
            />
            <Row>
                <Col md={3}>
                    <Card className="text-center mb-3 shadow">
                        <div className="text-center">
                            <p>
                                <Link to="#" onClick={handleShowChangePasswordModal}>
                                    Change Password
                                </Link>
                            </p>

                            <ChangePasswordModal
                                userId={user.id}
                                show={showChangePasswordModal}
                                handleClose={handleCloseChangePasswordModal}
                            />
                        </div>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card className="mb-3 shadow">
                        <Card.Body className="d-flex align-items-center">
                            <Col md={4}>Name :</Col>
                            <Col md={8}>
                                <Card.Text>{user.name}</Card.Text>
                            </Col>
                        </Card.Body>

                        <Card.Body className="d-flex align-items-center">
                            <Col md={4}>NationalId :</Col>
                            <Col md={8}>
                                <Card.Text>{user.nationalId}</Card.Text>
                            </Col>
                        </Card.Body>

                        <Card.Body className="d-flex align-items-center">
                            <Col md={4}>Birthday :</Col>
                            <Col md={8}>
                                <Card.Text>{user.birthday}</Card.Text>
                            </Col>
                        </Card.Body>

                        <Card.Body className="d-flex align-items-center">
                            <Col md={4}>Email :</Col>
                            <Col md={8}>
                                <Card.Text>{user.email}</Card.Text>
                            </Col>
                        </Card.Body>

                        <Card.Body className="d-flex align-items-center">
                            <Col md={4}>Mobile :</Col>
                            <Col md={8}>
                                <Card.Text>{user.phone}</Card.Text>
                            </Col>
                        </Card.Body>

                        <Card.Body className="d-flex align-items-center">
                            <Col md={4}>User Role :</Col>
                            <Col md={8}>
                                <Card.Text>{user.role}</Card.Text>
                            </Col>
                        </Card.Body>
                    </Card>

                    {user.role === "OWNER" && (
                        <Card className="mb-3 shadow">
                            <Card.Body className="d-flex align-items-center">
                                <Col md={2}>Car(s):</Col>
                                <Col md={10}>
                                    <ListGroup variant="flush">
                                        {currentCars.length > 0 ? (
                                            currentCars.map((car, index) => (
                                                <ListGroup.Item key={index}>
                                                    <strong>Name:</strong> {car.name} <br />
                                                    <strong>Brand:</strong> {car.brand}
                                                </ListGroup.Item>
                                            ))
                                        ) : (
                                            <Card.Text>No cars registered.</Card.Text>
                                        )}
                                    </ListGroup>
                                    <div className="mt-3">
                                        <Paginator
                                            itemsPerPage={itemsPerPage}
                                            totalItems={totalCars}
                                            currentPage={currentPage}
                                            paginate={paginate}
                                        />
                                    </div>
                                </Col>
                            </Card.Body>
                        </Card>
                    )}

                    <Card.Body>
                        <div className="d-flex justify-content-center mb-4">
                            <div className="mx-2">
                                <Link
                                    to={`/update-user/${user.id}/update`}
                                    className="btn btn-warning btn-sm"
                                >
                                    Edit profile
                                </Link>
                            </div>
                            <div className="mx-2">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={handleShowDeleteModal}
                                >
                                    Close account
                                </Button>
                            </div>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Container>
    );
}
