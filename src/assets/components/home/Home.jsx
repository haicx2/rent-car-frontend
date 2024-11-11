import {Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import about_us from "../../images/about_us.jpg";
import why_choose_us from "../../images/why-choose-us.webp";

export default function Home() {
    return (
        <Container className="home-container mt-5">
            <Row>
                <Col md={6} className="mb-3">
                    <Card>
                        <Card.Img
                            variant="top"
                            src={about_us}
                            alt="About us"
                            className="hero-image"/>
                        <Card.Body>
                            <h2 className='text-info'>Drive Your Way, Anytime</h2>
                            <Card.Title className="text-info">Welcome to AutoQuest</Card.Title>
                            <Card.Text>
                                Your go-to car rental service designed to get you on the road with ease and flexibility.
                                Whether you’re looking for a quick ride around town, a spacious SUV for a family trip,
                                or a luxury car to make a statement, we have you covered. Our app connects you to a
                                diverse fleet, so you can find the perfect vehicle for any occasion.
                            </Card.Text>
                        </Card.Body>
                        <Button variant='outline-info'> Start Booking Cars now!</Button>
                    </Card>
                </Col>
                <Col md={6} className="mb-3">
                    <Card>
                        <Card.Img
                            variant="top"
                            src={why_choose_us}
                            alt="About us"
                            className="hero-image"/>
                        <Card.Body>
                            <h2 className='text-info'>Why Choose Us?</h2>
                            <Card.Title className="text-info">Our Service</Card.Title>
                            <ListGroup className='services-list'>
                                <ListGroup.Item>Easy Booking: Reserve a car in just a few taps and hit the road in no
                                    time.</ListGroup.Item>
                                <ListGroup.Item>Affordable Pricing: Enjoy competitive rates, clear pricing, and no
                                    hidden fees.</ListGroup.Item>
                                <ListGroup.Item>Flexible Options: Choose from hourly, daily, or weekly rentals—whatever
                                    fits your schedule</ListGroup.Item>
                                <ListGroup.Item>Reliable Support: Our support team is here for you 24/7 to make your
                                    experience smooth and worry-free.</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        <Button variant='outline-info'> Start Booking Cars now!</Button>
                    </Card>
                </Col>
            </Row>
            <div className='card mb-5'>
                <h4>
                    What people are saying about{" "}
                    <span className='text-info'> AutoQuest</span> Booking Service
                </h4>
                <hr/>
                <p className="text-center">Here, we are going to be sliding cars across</p>
            </div>
        </Container>
    )
}