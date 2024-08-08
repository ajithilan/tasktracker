import Button from "@mui/material/Button"
import { useContext } from "react"
import { appcontext } from "../../../App"
import { context } from "../../../types/types";

type StatusButton = {
    text: string;
    color: string;
    hoveredColor: string;
}

export const StatusButton = ({ text, color, hoveredColor }: StatusButton) => {
    const { screenMedium } = useContext(appcontext) as context;

    const buttonStyle = {
        minWidth:'10px',
        border:'none',
        color:'white',
        fontWeight: 700,
        padding:0,
        transition:'.3s'
    }

    const largeDeviceStyle = {
        borderRadius:'0 4px 4px 0',
        fontSize:'12px'
    }

    const mobileButtonStyle = {
        borderRadius:'4px',
        fontSize:'10px'
    }

    return (
        <Button
        variant="contained"
        data-scroll={ text }
        sx={{
            ...(screenMedium ? mobileButtonStyle : largeDeviceStyle),
            ...buttonStyle,
            background: color,
            '&:hover': {
                background: hoveredColor
            }
        }}
        className={ `status-btn status-btn-${text}`}
        >
            { text.toUpperCase() }
        </Button>
    )
}