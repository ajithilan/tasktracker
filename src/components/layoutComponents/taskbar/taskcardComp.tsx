import { Accordion, AccordionSummary, AccordionDetails, AccordionActions } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext, useState } from "react";
import { appcontext } from "../../../App";
import { CustomButton } from "../../AddtComponents/customButton";
import { context, task } from "../../../types/types";

export const TaskcardComponent = ({obj}: {obj: task})=>{
    const {
        setAddTaskDialog,
        setEditTask,
        formObj,
        setDelete,
        screenMobile
    } = useContext(appcontext) as context;
    const { title, team, priority, date, assignee, description, status } = obj;
    const AccordionStyling = {
        color:'#263238be',
        minWidth:'100px',
        background: "rgba(253,253,253,1)",
        '&.MuiAccordion-root':{
            borderRadius: '10px',
            '&::before':{
                height:0
            }
        },
    }
    const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

    const handleOpen = (val:string) => {
        formObj.current = obj;
        val === 'EDIT' ? (setAddTaskDialog(true), setEditTask(true))  : setDelete(true);
    }

    const handleExpand = () => {
        setIsAccordionExpanded(prev => !prev);
    }


    return  (
        <Accordion disableGutters className="task" sx={AccordionStyling} onChange={handleExpand}>
            <AccordionSummary
            className="task-summary"
            expandIcon={<ExpandMoreIcon />}
            sx={{
                padding: '10px 0',
                '.MuiAccordionSummary-content': {
                    margin: 0 
                },
                '.task-team': {
                    ...(screenMobile
                        && {
                        display: 'none'
                    })
                },
                ...(isAccordionExpanded
                    && {
                        paddingBottom: 0,
                        alignItems: 'flex-start',
                        '.task-team': {
                            display: 'block'
                        }
                    })
                }}>
                <div className={ `task-summary-container ${isAccordionExpanded && "summary-col"}`}>
                    <div className="task-title" style={{...(isAccordionExpanded && {width:'100%', padding:'0 0 10px'})}}>{ title }</div>
                    {
                        <div className="task-team">
                            {
                                isAccordionExpanded
                                ? <>Team :<span>{ team }</span></>
                                : team
                            }
                        </div>
                    }
                    {
                        isAccordionExpanded
                        ? <div className="exp-task-priority">Priority :<span>{ priority }</span></div>
                        : <div className="task-priority">{ priority }</div>
                    }
                </div>
            </AccordionSummary>
            <AccordionDetails sx={{padding:0}} className="task-details">
                <span>Created date : <span>{ date }</span></span>
                <span>Assignee : <span>{ `@${assignee}` }</span></span>
                <span className="task-desc">{ description }</span>
                <span>Task status : <span>{ status }</span></span>
            </AccordionDetails>
            <AccordionActions className="task-btngrp" sx={{padding: '20px 0'}}>
                <CustomButton
                text="edit"
                sx={{ ...(screenMobile && { fontSize: 10 }), maxWidth: '200px' }}
                callback={() => handleOpen('EDIT')}
                />
                <CustomButton
                text="delete"
                style="customError"
                sx={{ ...(screenMobile && { fontSize: 10 }), maxWidth: '200px' }}
                callback={() => handleOpen('DELETE')}
                />
            </AccordionActions>
        </Accordion>
    )
}