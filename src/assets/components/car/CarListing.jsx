import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import CarCard from "./CarCard.jsx";
import {getCars} from "./CarService.js";

export default function CarListing() {
    const [cars, setCars] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        getCars().then((data) => {
            setCars(data.data)
        }).catch((error) => {
            setErrorMessage(error.message)
        })
    }, [])

    if (cars.length === 0) {
        return <p>No Cars found.</p>
    }

    return (
        <Row>
            <h6>See OUR CARS</h6>
            <Col>
                <Row>
                    <h5>The search goes here</h5>
                </Row>
            </Col>
            <Col>
                <Container>
                    <Row>
                        {cars.map((car, index) => (
                            <CarCard key={index} car={car}/>
                        ))}
                    </Row>
                </Container>
            </Col>
        </Row>
    )
}