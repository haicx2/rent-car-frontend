import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CarCard from "./CarCard"; // Adjust import path as needed

import CarSearch from "./CarSearch"; // Adjust import path as needed

import {getCars} from "./CarService.js";
import UseMessageAlerts from "../hook/UserMessageAlert.js"; // Adjust import path as needed

const CarListing = () => {
    const [cars, setCars] = useState([]);
    const [allCars, setAllCars] = useState([]);
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
    };

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
                    {cars.map((car, index) => (
                        <CarCard key={index} car={car} />
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default CarListing;
