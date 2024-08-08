import { Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { useContext } from "react"
import { appcontext } from "../../App"
import { CustomButton } from "./customButton";
import { context, task } from "../../types/types";


export const DeleteTaskButton = ()=>{
    const {
        localStorageTasks,
        formObj,
        deleteTask,
        setDelete,
        setAlert,
        alertText,
        setDeleteAlert,
        screenMobile
    } = useContext(appcontext) as context;
    const customStyling = {
        height:'1.5em',
        fontSize: screenMobile ? 14 : 18,
        fontWeight: 600,
        padding: "20px 20px"
    }

    const handleClose = ()=>{
        formObj.current = null;
        setDelete(false);
    }

    const handleDeleteTask = ()=>{
        const fObj = formObj.current;
        if(fObj) localStorageTasks[fObj.status] = localStorageTasks[fObj.status].filter((el: task) => el.id !== fObj.id);
        localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
        if(formObj.current) alertText.current = formObj.current.title;
        setDelete(false);
        setDeleteAlert(true);
        setAlert(true);
    }


    return  (
        <Dialog open={ deleteTask } onClose={() => handleClose()}>
            <DialogContent sx={{ padding: screenMobile ? 0 : "10px 20px" }}>
                <DialogContentText sx={{ ...customStyling }}>
                    Are you sure you want to delete this task ?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: screenMobile ? "16px" : "20px 30px" }}>
                <CustomButton
                text="cancel"
                variant="text"
                sx={ screenMobile ? { fontSize: 10, width: 100 } : undefined }
                callback={() => handleClose()}
                />
                <CustomButton
                text="delete"
                style="customError"
                sx={ screenMobile ? { fontSize: 10, width: 100 } : undefined }
                callback={ handleDeleteTask }
                />
            </DialogActions>
        </Dialog>
    )
}