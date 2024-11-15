import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import UseMessageAlerts from "../hook/UserMessageAlert.js";
import {getCarById} from "./CarService.js";
import {Card, Col, Container, Row} from "react-bootstrap";
import AlertMessage from "../common/AlertMessage.jsx";
import {BsFillArrowRightSquareFill} from "react-icons/bs";
import Paginator from "../common/Paginator.jsx";
import Review from "../review/Review.jsx";
import Rating from "../rating/Rating.jsx";
import RatingStars from "../rating/RatingStars.jsx";

export default function Car() {
    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {carId} = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewPerPage, setReviewPerPage] = useState(2);

    const {errorMessage, showErrorAlert, setErrorMessage, setShowErrorAlert} =
        UseMessageAlerts();

    const getCar = async () => {
        setIsLoading(true);
        try {
            console.log("The car: ", carId);
            const result = await getCarById(carId);
            console.log("The response :", result);
            setCar(result.data);
            setIsLoading(false);
        } catch (error) {
            console.error("The error message :", error);
            setErrorMessage(error.response.data.message);
            setShowErrorAlert(true);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCar();
    }, [carId]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    const indexOfLastReview = currentPage * reviewPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewPerPage;
    const currentReviews = car.reviews.slice(
        indexOfFirstReview,
        indexOfLastReview) || [];

    return (
        <Container className='d-flex justify-content-center align-items-center mt-5'>
            {showErrorAlert && (
                <AlertMessage type={"danger"} message={errorMessage}/>
            )}
            {car && (
                <Card className='review-card mt-2'>
                    <Row>
                        <Col>
                            <Link to={"/cars"}>
                                <BsFillArrowRightSquareFill/> back to Car List
                            </Link>
                        </Col>
                    </Row>
                    <Card.Body>
                        <Card.Title>
                            Car Name: {car.name}
                        </Card.Title>
                        <Card.Text>Brand : {car.brand}</Card.Text>
                        <Card.Text>License Plate : {car.licensePlate}</Card.Text>
                        <Card.Text>Owner Email : {car.ownerEmail}</Card.Text>
                        {car.averageRating > 0 && (
                            <Card.Text className='rating-stars'>
                                Ratings: (
                                {car.averageRating > 0
                                    ? Number(car.averageRating.toFixed(1))
                                    : "0.0"}
                                ) stars
                                <RatingStars rating={car.averageRating}/> rated by (
                                {car.totalCustomers || 0}{" "}
                                {car.totalCustomers === 1 ? "person" : "people"}){" "}
                            </Card.Text>
                        )}
                        <Link
                            to={`/bookCar/${car.id}`}
                            className='link'>
                            Book Car
                        </Link>
                        <hr/>

                        <p className='about'>
                            About This {car.name}{" "}
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
                            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
                            fugiat iusto fuga praesentium optio, eaque rerum! Provident
                            similique accusantium nemo autem. Veritatis obcaecati tenetur iure
                            corporis!
                        </p>
                        <hr/>
                        <Rating carId={car.id} onReviewSubmit={null}/>
                        <h4 className='text-center mb-4'>Reviews</h4>
                        <hr/>

                        {/* Render paginated reviews */}
                        {currentReviews && currentReviews.length > 0 ? (
                            currentReviews.map((review) => (
                                <Review
                                    key={review.id}
                                    review={review}
                                />
                            ))
                        ) : (
                            <p>No reviews available yet.</p>
                        )}

                        <Paginator
                            itemsPerPage={reviewPerPage}
                            totalItems={car.reviews.length}
                            paginate={setCurrentPage}
                            currentPage={currentPage}>
                        </Paginator>
                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}