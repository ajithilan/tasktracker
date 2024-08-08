import { Avatar } from "@mui/material"
import { green } from '@mui/material/colors';
import { BasicFilterBar } from "../filterbar/mobileFormat/basicfilterbar";
import { useContext } from "react";
import { appcontext } from "../../../App";
import { context } from "../../../types/types";


export const TopbarComponent = ()=>{
    const { filterDisplay } = useContext(appcontext) as context;

    return (
    <div className="topbar-comp">
        <h1 className="topbar-title">TaskTracker</h1>
        <div className="topbar-detail">
            <Avatar className="topbar-profile" sx={{ bgcolor: green[500], fontWeight: 700 }} variant="rounded">A</Avatar>
            { !filterDisplay && <BasicFilterBar/> }
        </div>
    </div>
    )
}