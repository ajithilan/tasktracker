import { MutableRefObject } from "react";

type task = {[key:string]: string};

type filter = {
    assignee: string,
    priority: string,
    startDate: string,
    endDate: string
}

interface context {
    localStorageTasks: {[key: string]: {}[]};
    filteredTasks: {[key: string]: {}[]};
    applyFilter: () => void;
    applySort: () => void;
    addTaskDialog: boolean;
    setAddTaskDialog: (val: boolean) => void;
    alert: boolean;
    setAlert: (val: boolean) => void;
    alertText: MutableRefObject<string>;
    disableForm: boolean;
    setDisableForm: (val: boolean) => void;
    editTask: boolean;
    setEditTask: (val: boolean) => void;
    editAlert: boolean;
    setEditAlert: (val: boolean) => void;
    deleteTask: boolean;
    setDelete: (val: boolean) => void;
    deleteAlert: boolean;
    setDeleteAlert: (val: boolean) => void;
    formObj: MutableRefObject<task | null>;
    startDate: MutableRefObject<HTMLInputElement | null>;
    endDate: MutableRefObject<HTMLInputElement| null>;
    filters: filter;
    setFilters: (val: {}) => void;
    filterDefaultValues: filter;
    filterApplied: boolean;
    setFilterApplied: (val: boolean) => void;
    sortApplied: boolean;
    setSortApplied: (val: boolean) => void;
    screenMobile: boolean;
    screenMedium: boolean;
    filterDisplay: boolean;
    openFilterDialog: boolean;
    setOpenFilterDialog: (val: boolean) => void;
}



export type { task, filter, context }