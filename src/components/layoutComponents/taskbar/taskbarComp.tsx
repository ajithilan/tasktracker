import { useContext, useRef } from "react"
import { TaskcardComponent } from "./taskcardComp"
import { appcontext } from "../../../App"
import { Scrolleasy } from "./scrolleasy"
import { FilterbarComponent } from "../filterbar/filterbarComp"
import { DeleteTaskButton } from "../../AddtComponents/deleteTaskComp"
import { context, task } from "../../../types/types"
import bgsvg from "../../../assets/tasktrackerbg.svg"

export const TaskbarComponent = ()=>{
    const {
        localStorageTasks,
        filteredTasks,
        filterApplied,
        sortApplied,
        filterDisplay
    } = useContext(appcontext) as context;
    const bgStyling = {
        backgroundImage: `url(${bgsvg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
    }
    const taskToDisplay = (filterApplied || sortApplied) ? filteredTasks : localStorageTasks;
    const emptyRef = useRef(Object.values(localStorageTasks).every(val=> val.length === 0));

    return (
        <div className="taskbar-comp" style={bgStyling}>
            <section className="quickactions-container">
                <Scrolleasy/>
                { filterDisplay  && <FilterbarComponent/> }
            </section>
            <section className="task-container">
                {
                    (filterApplied && emptyRef.current)
                        ? <div className="no-tasks">No tasks match the applied filters</div>
                        : Object.keys(taskToDisplay).map((key, index)=>{
                            return (
                                <section className={"task-section task-"+ key} key={key+index}>
                                    {
                                        taskToDisplay[key].length !== 0
                                            ? (
                                                taskToDisplay[key].map((obj: task) =>{
                                                    return <TaskcardComponent key={obj.title+obj.date} obj={obj}/>
                                                })
                                            )
                                            : <span className="no-active-tasks">No active tasks in "{key.toLocaleUpperCase()}"</span>
                                    }
                                </section>
                            )
                        })
                }
            </section>
            <DeleteTaskButton/>
        </div>
    )
}