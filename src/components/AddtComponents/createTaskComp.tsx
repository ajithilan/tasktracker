import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent} from "@mui/material";
import { FormEvent, useContext } from "react";
import { appcontext } from "../../App";
import { CustomButton } from "./customButton";
import { context, task } from "../../types/types";

export const CreateTaskComponent = ()=>{
    const {
        localStorageTasks,
        applyFilter,
        applySort,
        addTaskDialog,
        setAddTaskDialog,
        setAlert,
        alertText,
        disableForm,
        setDisableForm,
        editTask,
        setEditTask,
        setEditAlert,
        formObj,
        screenMobile
    } = useContext(appcontext) as context;
    const dialogBoxStyle = {
        ...(screenMobile && {
            width: '220px',
            padding: '8px 16px',
        }),
        fontFamily: '"Poppins", sans-serif',
        background: editTask ? 'linear-gradient(128deg, rgba(26,144,138,1) 0%, rgba(164,187,250,1) 85%)' : 'linear-gradient(to right, #b993d6, #8ca6db)'
    }
    const obj: null | task = formObj.current;

    const closeNewTaskDialog = ()=>{
        setAddTaskDialog(false);
        setEditTask(false);
    }

    const handleClearForm = ()=>{
        const arr: HTMLInputElement[] = Array.from(document.querySelectorAll('.form-details'));
        arr.map(el=>el.value='');
    }

    const handleAddTask = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formdata = new FormData(e.target as HTMLFormElement);
        const date = new Date;
        const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
        const title = (formdata.get('title') as string)?.trim();
        const newID = title+formattedDate;
        const alertVal = editTask;
        if(obj) alertText.current = editTask ? obj.title : title;
        setDisableForm(true);
        const datatostore = {
            id: editTask ? obj?.id : newID,
            date: editTask ? obj?.date : formattedDate,
            title,
            description: formdata.get('description'),
            team: formdata.get('team'),
            assignee: (formdata.get('assignee') as string)?.trim().toLowerCase(),
            priority: formdata.get('priority'),
            status: editTask ? formdata.get('status') : 'pending'
        }
        function editedTaskPush(){
            if(obj?.status !== datatostore.status){
                if(obj?.status) localStorageTasks[obj.status] = localStorageTasks[obj.status].filter((task: task)=>task.id !== obj?.id);
                if(datatostore.status){
                    localStorageTasks[datatostore.status as keyof task].push(datatostore);
                }
            }else{
                const index = localStorageTasks[obj?.status].findIndex((el: task)=>el.id === obj?.id);
                localStorageTasks[obj?.status][index] = datatostore;
            }
        }
        if(editTask) editedTaskPush();
        else localStorageTasks.pending.push(datatostore);
        localStorage.setItem('tasks',JSON.stringify(localStorageTasks));
        setTimeout(() =>{       
            setAlert(true);
            alertVal && setEditAlert(true);
            setDisableForm(false);
            (e.target as HTMLFormElement).reset();
            setTimeout(() => {
                setEditTask(false);
                setAddTaskDialog(false);
            }, 100);
        }, 1000);
        applyFilter();
        applySort();
    }

    return  (
        <Dialog open={addTaskDialog} onClose={closeNewTaskDialog}>
            <DialogContent sx={dialogBoxStyle}>
                <form onSubmit={handleAddTask} className="addnewtask">
                    <input type="text" defaultValue={editTask ? obj?.title : ''} placeholder="Title" className="form-details form-title" name="title" required/>
                    <textarea defaultValue={editTask ? obj?.description : ''} className="form-details form-description" placeholder="Description" name="description" style={{resize: 'none'}} required></textarea>
                    <input type="text" className="form-details form-team" defaultValue={editTask ? obj?.team : ''} placeholder="Team" name="team" autoComplete="off" required/>
                    <input type="text" className="form-details form-assignee" defaultValue={editTask ? obj?.assignee : ''} placeholder="Assignee" name="assignee" autoComplete="off" required/>
                    <div className="form-select">
                        <select name="priority" className="form-details form-priority" defaultValue={editTask ? obj?.priority : ''} required>
                            <option value="" hidden>Priority</option>
                            <option value="P0">P0</option>
                            <option value="P1">P1</option>
                            <option value="P2">P2</option>
                        </select>
                        {
                            editTask 
                                && (
                                <select name="status" className="form-details form-status" defaultValue={obj?.status}>
                                    <option value="" hidden>Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="deployed">Deployed</option>
                                    <option value="deffered">Deffered</option>
                                </select>
                                )
                        }
                    </div>
                    {
                        editTask
                            ? (
                                <DialogActions sx={{display:'flex', flexDirection:'column', gap:'10px', padding:'8px 0'}}>
                                    <div className="edit-btngrp">
                                        <CustomButton text="submit" type="submit" sx={ screenMobile ? { fontSize: '10px'} : undefined}/>
                                        <CustomButton text="clear" sx={ screenMobile ? { fontSize: '10px'} : undefined} callback={ handleClearForm }/>
                                    </div>
                                    <div style={{width:'100%', margin:0}}>
                                        <CustomButton text="close" style="customError" sx={ screenMobile ? { fontSize: '10px'} : undefined} callback={ closeNewTaskDialog }/>                 
                                    </div>
                                </DialogActions>
                            )
                            : <CustomButton text="submit" type="submit" sx={ screenMobile ? { fontSize: '10px'} : undefined} variant="contained"/>
                    }
                </form>
            </DialogContent>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={disableForm}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Dialog>
    )
}