import {Alert} from "react-bootstrap";

export default function AlertMessage({type, message}) {
    if (!message) return null;
    return (
        <Alert variant={type} dismissible>
            {message}
        </Alert>
    );
}