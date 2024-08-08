import { Button } from "@mui/material"

interface Button {
    text: string,
    variant?: 'text' | 'contained' | 'outlined',
    style?: 'customPrimary' | 'customError' | 'customGreen',
    type?: "button" | "submit" | "reset" | undefined,
    sx?: {[key:string]: string | {}} | undefined,
    callback?: () => void
}

export const CustomButton = ({ text, variant="contained", style="customPrimary", type="button", sx={}, callback=()=>{} } : Button) => {
    const color: {[key:string]: {}} = {
        customPrimary: {
            background:'#1976d2bb',
            '&:hover':{background:'#1976d2d3'}
        },
        customError: {
            background:'#f55252d7',
            '&:hover':{background:'#df4848d7'}
        },
        customGreen: {
            backgroundColor:'#0d9275a2',
            '&:hover':{backgroundColor:'#0d9275dc'}
        }
    }

    return (
        <Button
        type={ type }
        variant={ variant }
        sx={{
            ...(variant !== "text" && color[style]),
            minWidth: "fit-content",
            width: '100%',
            fontSize: 12,
            fontWeight: 700,
            textTransform: "uppercase",
            ...sx
        }}
        onClick={ callback }
        >
            { text }
        </Button>
    )
}