import {Card} from "react-bootstrap";
import placeholder from "../../images/placeholder.webp";

export default function CarImage({userId, carImage, altText = "Car Image"}) {
    return (
        <>
            {carImage ? (
                <Card.Img src={`data:image/png;base64, ${carImage}`} className="user-image"
                          alt="Car Image"/>) : (
                <Card.Img src={placeholder} alt={altText} />
            )}
        </>

    )
}