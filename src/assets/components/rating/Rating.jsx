import {useState} from "react";
import {Button, Form} from "react-bootstrap";
import UseMessageAlerts from "../hook/UserMessageAlert.js";
import {addReview} from "../review/ReviewService.js";
import AlertMessage from "../common/AlertMessage.jsx";
import {FaStar} from "react-icons/fa";

export default function Rating({carId, onReviewSubmit}) {
    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(null);
    const [feedback, setFeedback] = useState("");

    const {
        successMessage,
        errorMessage,
        setSuccessMessage,
        setErrorMessage,
        showSuccessAlert,
        showErrorAlert,
        setShowSuccessAlert,
        setShowErrorAlert,
    } = UseMessageAlerts();

    const customerId = 3;

    // const{veterinarianId} = useParams()

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewInfo = {
            rating: rating,
            comment: feedback,
        };

        try {
            console.log("The review info", reviewInfo);
            const response = await addReview(carId, customerId, reviewInfo);
            setSuccessMessage(response.message);
            setShowSuccessAlert(true);
            if (onReviewSubmit) {
                onReviewSubmit();
            }
        } catch (error) {
            setErrorMessage(error.message);
            setShowErrorAlert(true);
        }
    };

    return (
        <>
            {showErrorAlert && (
                <AlertMessage type={"danger"} message={errorMessage} />
            )}

            {showSuccessAlert && (
                <AlertMessage type={"success"} message={successMessage} />
            )}

            <Form onSubmit={handleSubmit}>
                <h3>Rate this car :</h3>
                <div className='mb-2'>
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <Form.Label key={index} className='me-2'>
                                <Form.Control
                                    type='radio'
                                    name='rating'
                                    value={ratingValue}
                                    onChange={() => handleRatingChange(ratingValue)}
                                    checked={rating === ratingValue}
                                />
                                <FaStar
                                    size={20}
                                    className='star'
                                    color={
                                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                                    }
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </Form.Label>
                        );
                    })}
                </div>
                <Form.Group controlId='feedback'>
                    <Form.Control
                        as='textarea'
                        row={4}
                        value={feedback}
                        required
                        onChange={handleFeedbackChange}
                        placeholder='Leave a feedback message'
                    />
                </Form.Group>

                <div className='mt-2'>
                    <Button type='submit' variant='outline-primary'>
                        Submit review
                    </Button>
                </div>
                <p>
                    You have rated this car with{" "}
                    <span style={{ color: "orange" }}>{rating} stars</span>
                </p>
            </Form>
        </>
    )
}