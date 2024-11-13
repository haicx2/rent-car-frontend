import {Spinner} from "react-bootstrap";

export default function ProcessSpinner({size = "sm",
                                           animation = "border",
                                           message = "",
                                       }) {
    return (
        <div className='text-center'>
            <Spinner
                as='span'
                animation={animation}
                size={size}
                role='status'
                aria-hidden='true'
            />
            {message && <span className='sr-only'>{message}</span>}
        </div>
    )

}