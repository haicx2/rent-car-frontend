import {Button} from "react-bootstrap";

export default function ActionButtons({
                                          title,
                                          variant,
                                          onClick,
                                          disabled,
                                          className = "",
                                      }) {
    return (
        <Button
            variant={variant}
            size='sm'
            disabled={disabled}
            onClick={onClick}
            className={className}>
            {title}
        </Button>
    )
}