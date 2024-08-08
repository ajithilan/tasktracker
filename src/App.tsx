import "./App.sass"
import { TopbarComponent } from "./components/layoutComponents/topbar/topbarComp"
import { TaskbarComponent } from "./components/layoutComponents/taskbar/taskbarComp"
import { createContext, useEffect, useRef, useState } from "react"
import { AlertComponent } from "./components/AddtComponents/alertComponent"
import { CreateTaskComponent } from "./components/AddtComponents/createTaskComp"
import { task, context } from "./types/types"
import { tasks } from "./localstoragedata"

export const appcontext = createContext<context | null>(null);

function App() {
  const [addTaskDialog, setAddTaskDialog] = useState(false);
  const [alert, setAlert] = useState(false);
  const alertText = useRef('');
  const [disableForm, setDisableForm] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [editAlert, setEditAlert] = useState(false);
  const [deleteTask, setDelete] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [screenMobile, setScreenMobile] = useState(false);
  const [screenMedium, setScreenMedium] = useState(false);
  const [filterDisplay, setFilterDisplay] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const startDate = useRef(null);
  const endDate = useRef(null);
  const formObj = useRef(null);
  const filterDefaultValues = {
    assignee:'',
    priority:'',
    startDate:'',
    endDate:''
  }
  // const tasks = {
  //   pending:[],
  //   inprogress:[],
  //   completed:[],
  //   deployed:[],
  //   deffered:[]
  // }

  function getLocalData(dataTag: string, setData: any){
    const localData = localStorage.getItem(dataTag);
    const LSdata = localData ? JSON.parse(localData) : null;
    LSdata === null && localStorage.setItem(dataTag, JSON.stringify(setData));
    return LSdata !== null ? LSdata : setData;
  }

  const localStorageTasks = getLocalData('tasks', tasks);
  const [filterApplied, setFilterApplied] = useState(getLocalData('filterApplied', false));
  const [filters, setFilters] = useState(getLocalData('filters', filterDefaultValues));
  const [sortApplied, setSortApplied] = useState(getLocalData('sortApplied', false));
  const [filteredTasks, setFilteredTasks] = useState({});

  //filter functionality
  function applyFilter(){
    let tasks: {[key:string]: []} = {};
    function compareDates(obj: task, start: boolean){
      const taskDate = new Date(Date.parse(obj.date));
      if(start){
        const filterStartDate = new Date(Date.parse(filters.startDate));
        return taskDate.getTime() >= filterStartDate.getTime();
      }else{
        const filterEndDate = new Date(Date.parse(filters.endDate));
        return taskDate.getTime() < filterEndDate.getTime();
      }
    }

    setFilteredTasks(() => {
      Object.keys(localStorageTasks).map(status=>{
        tasks[status] = localStorageTasks[status].filter((obj: task)=>{
            return (
              Object.keys(filters).every(fkey=>{
                if(filters[fkey]){
                  switch(fkey){
                    case 'startDate':{
                      return compareDates(obj, true);
                    }
                    case 'endDate':{
                      return compareDates(obj, false)
                    }
                    default:{
                      return obj[fkey] === filters[fkey];
                    }
                  }
                }
                else return true;
            })
            )
        });
      });
      return tasks;
    });
    if(!filterApplied && !Object.values(filters).every(val => val === '')){
      setFilterApplied(true);
      localStorage.setItem('filterApplied', JSON.stringify(true));
    }
  }

  //sorting functionality
  function applySort(){
    let tasks: {[key:string]: []} = {};
    const temptasks = filterApplied ? filteredTasks : localStorageTasks;
    setFilteredTasks(() => {
      Object.keys(temptasks).map(status=>{
        if(temptasks[status].length > 1){
            tasks[status] = temptasks[status].sort((a: task,b: task) => parseInt(a.priority[1]) - parseInt(b.priority[1]));
        }else{
          tasks[status] = temptasks[status];
        }
      });
      return tasks;
    });
  };

  //checks if any filter is applied
  const checkAllFilters = ()=>{
    const noFilter = Object.values(filters).every(val=>val==='');
    if(noFilter){
        localStorage.setItem('filterApplied', 'false');
        setFilterApplied(false);
    }
  }

  function checkIfWindowSmall() {
    const width = window.innerWidth;
    setScreenMobile(width < 421);
    setScreenMedium(width < 901);
    setFilterDisplay(width > 1200);
  }

  window.onresize = checkIfWindowSmall;
  
  useEffect(() => {
    if(alert){
      setTimeout(() => {
        setAlert(false);
        setTimeout(() => {   
          setEditAlert(false);
          setDeleteAlert(false);
        }, 100);
      }, 3000);
    };
    checkIfWindowSmall();
  }, [alert])

  useEffect(() => {
    checkAllFilters();
    localStorage.setItem('filters', JSON.stringify(filters));
    if(sortApplied) applySort();
    applyFilter();
  }, [filters, sortApplied])
  
  const contextvalues = {
    localStorageTasks,
    filteredTasks,
    applyFilter,
    applySort,
    addTaskDialog,
    setAddTaskDialog,
    alert,
    setAlert,
    alertText,
    disableForm,
    setDisableForm,
    editTask,
    setEditTask,
    editAlert,
    setEditAlert,
    deleteTask,
    setDelete,
    deleteAlert,
    setDeleteAlert,
    formObj,
    startDate,
    endDate,
    filters,
    setFilters,
    filterDefaultValues,
    filterApplied,
    setFilterApplied,
    sortApplied,
    setSortApplied,
    screenMobile,
    screenMedium,
    filterDisplay,
    openFilterDialog,
    setOpenFilterDialog
  }

  return <div className="App">
    <appcontext.Provider value={ contextvalues }>
      <TopbarComponent/>
      { addTaskDialog && <CreateTaskComponent/> }
      <TaskbarComponent/>
      <AlertComponent/>
    </appcontext.Provider>
  </div>
}

export default App