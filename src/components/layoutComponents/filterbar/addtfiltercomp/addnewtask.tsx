import { useContext } from "react"
import { appcontext } from "../../../../App"
import { CustomButton } from "../../../AddtComponents/customButton"
import { context } from "../../../../types/types";


export const AddTaskButton = ()=>{
    const { setAddTaskDialog } = useContext(appcontext) as context;

    const openNewtaskDialog = ()=>{
        setAddTaskDialog(true);
    }

    return (
        <CustomButton
        text="Add new task"
        style="customGreen"
        callback={ openNewtaskDialog }
        />
    )
}