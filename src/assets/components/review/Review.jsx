import RatingStars from "../rating/RatingStars.jsx";

export default function Review({review}) {
    const displayName = review.customerName;
    return (
        <div className='mb-4'>
            <div className='d-flex align-item-center me-5'>
                <div>
                    <div>
                        <h5 className='title ms-3'>
                            <RatingStars rating={review.rating}/>
                        </h5>
                    </div>
                    <div className='mt-4'>
                        <p className='review-text ms-4'>{review.feedback}</p>
                    </div>
                    <div>
                        <p className="ms-4">{displayName}</p>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    )
}