import {Accordion, Card, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import placeholder from "../../images/placeholder.webp";

export default function CarCard({car}) {
    return (
        <Col key={car.id} className="mb-4 xs={12}">
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <div className="d-flex align-items-center">
                            <Link to={''}>
                                {car.image ? (
                                    <Card.Img src={`data:image/png;base64, ${car.image}`} className="user-image"
                                              alt="Car Image"/>) : (
                                    <Card.Img src={placeholder}/>
                                )}
                            </Link>
                        </div>
                        <div>
                            <Card.Title className="title">{car.name}</Card.Title>
                            <Card.Title>{car.brand}</Card.Title>
                            <Card.Title className="review rating-stars">
                                Review: Some stars
                            </Card.Title>
                            <Link to={""}>Book car</Link>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <Link to={''} className="link-2">See what people think about</Link>
                            <span className="margin-left-space">{car.name}</span>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Col>
    )
}