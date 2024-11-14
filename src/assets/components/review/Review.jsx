import {useState} from "react";
import UserMessageAlert from "../hook/UserMessageAlert.js";
import {Form} from "react-bootstrap";

export default function Review({carId, onReviewSubmit}) {
        const [hover, setHover] = useState(null);
        const [reviewInfo, setReviewInfo] = useState({
            rating: null,
            comment: null,
        });
        const {
            successMessage,
            setSuccessMessage,
            errorMessage,
            setErrorMessage,
            showSuccessAlert,
            setShowSuccessAlert,
            showErrorAlert,
            setShowErrorAlert
        } = UserMessageAlert();

        const handleInputChange = (e) => {
            const {name, value} = e.target.value;
            setReviewInfo((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                const response = await addReview(carId, customerId, reviewInfo.review);
                setSuccessMessage(response.data.message);
                setShowSuccessAlert(true);
                if (onReviewSubmit) {
                    onReviewSubmit();
                }
            } catch (error) {
                setErrorMessage(error.response.data.message);
                setShowErrorAlert(true);

            }
        }
    return (
        <>
            <Form>
                <h3>Rate this car:</h3>
                <div>
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <Form.Label key={index}>
                                <Form.Check
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onChange={handleInputChange}
                                    checked={reviewInfo.rating === ratingValue}
                                />
                            </Form.Label>
                        )
                    })
                    }
                </div>
            </Form>
        </>
    )
}