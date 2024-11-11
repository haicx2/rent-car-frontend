import {Carousel} from "react-bootstrap";
import bg1 from "../../images/bg1.jpg";
import bg2 from "../../images/bg2.webp";
import bg3 from "../../images/bg3.jpg";
import {useState} from "react";

export default function BackGroundImageSlider() {
    const backgrounds = [bg1, bg2, bg3];
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className='background-slider'>
            <Carousel activeIndex={index} onSelect={handleSelect} interval={20000}>
                {backgrounds.map((background, idx) => (
                    <Carousel.Item key={idx}>
                        <img
                            className='d-block w-100'
                            src={background}
                            alt={`Slide ${idx}`}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}