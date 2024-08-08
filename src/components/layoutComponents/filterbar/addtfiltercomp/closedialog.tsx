import { useContext } from "react"
import { appcontext } from "../../../../App"
import { CustomButton } from "../../../AddtComponents/customButton";
import { context } from "../../../../types/types";

export const CloseDialogButton = ()=>{
    const { setOpenFilterDialog } = useContext(appcontext) as context;

    return (
        <CustomButton
        text="close"
        style="customError"
        callback={ () => setOpenFilterDialog(false) }
        />
    )
}