import { Alert, Snackbar } from "@mui/material"
import { useContext } from "react"
import { appcontext } from "../../App"
import { context } from "../../types/types";

export const AlertComponent = ()=>{
    const {
        alert,
        alertText,
        editAlert,
        deleteAlert,
    } = useContext(appcontext) as context;

    return (
        <Snackbar open={alert} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert
            severity={ editAlert ? 'info' : (deleteAlert ? 'error' : 'success') }>
            {
                editAlert
                ? `"${alertText.current}" task edited`
                : (
                    deleteAlert
                    ? `"${alertText.current}" task deleted!`
                    : `New task "${alertText.current}" has been added`
                )
            }
            </Alert>
        </Snackbar>
    )
}