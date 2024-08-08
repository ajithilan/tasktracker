import { useContext } from "react"
import { FilterbarComponent } from "../filterbarComp"
import { appcontext } from "../../../../App"
import { AddTaskButton } from "../addtfiltercomp/addnewtask";
import { Modal } from "@mui/material"
import { CustomButton } from "../../../AddtComponents/customButton";
import { context } from "../../../../types/types";


export const BasicFilterBar = ()=>{
    const {
        openFilterDialog,
        setOpenFilterDialog,
    } = useContext(appcontext) as context;

    const handleOpen = ()=>{
        setOpenFilterDialog(true);
    }

    const  handleClose = ()=>{
        setOpenFilterDialog(false);
    }

    return (
        <div className="basic-filterbar">
            <CustomButton
            text="Filters"
            callback={ handleOpen }
            />
            <AddTaskButton/>
            <Modal
            open={openFilterDialog}
            sx={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                backdropFilter: "blur(2px)",
                background: "rgba(255,255,255,0.1)",
                }}
            onClose={ handleClose }
            >
                <>
                    <FilterbarComponent/> 
                </>
            </Modal>
        </div>
    )
}