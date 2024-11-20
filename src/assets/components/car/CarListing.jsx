import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CarCard from "./CarCard"; // Adjust import path as needed
import CarSearch from "./CarSearch"; // Adjust import path as needed
import {getCars} from "./CarService.js";
import UseMessageAlerts from "../hook/UserMessageAlert.js";
import Paginator from "../common/Paginator.jsx";// Adjust import path as needed

const CarListing = () => {
    const [cars, setCars] = useState([]);
    const [allCars, setAllCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Set the number of items per page

    const { errorMessage, setErrorMessage, showErrorAlert, setShowErrorAlert } =
        UseMessageAlerts(); // error handling hook

    useEffect(() => {
        getCars()
            .then((data) => {
                setCars(data.data);
                setAllCars(data.data);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message || error.message);
                setShowErrorAlert(true);
            });
    }, []);

    // Handle search result (apply filters or reset to full list)
    const handleSearchResult = (filteredCars) => {
        if (!filteredCars || filteredCars.length === 0) {
            setCars([]); // If no cars match, show an empty list
        } else {
            setCars(filteredCars); // If there are matching cars, update the list
        }
        setCurrentPage(1); // Reset to the first page after search
    };

    // Calculate current cars to display based on pagination
    const indexOfLastCar = currentPage * itemsPerPage;
    const indexOfFirstCar = indexOfLastCar - itemsPerPage;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (cars.length === 0) {
        return <p>No cars found at this time.</p>; // Message if no cars available
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <h2 className="text-center mb-4 mt-4">See Our Cars</h2>
            </Row>

            <Row className="justify-content-center">
                <Col md={4}>
                    <CarSearch onSearchResult={handleSearchResult} allCars={allCars} />
                </Col>
                <Col md={7}>
                    {currentCars.map((car, index) => (
                        <CarCard key={index} car={car} />
                    ))}
                </Col>
            </Row>

            <Row className="justify-content-center mt-4">
                <Paginator
                    itemsPerPage={itemsPerPage}
                    totalItems={cars.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </Row>
        </Container>
    );
};

export default CarListing;