import { FilterbyPriorityComponent } from "./filterPriorityComp"
import { FormEvent, KeyboardEvent, useContext, useEffect } from "react";
import { appcontext } from "../../../App";
import { FilterbySortComponent } from "./filtersortComp";
import { AddTaskButton } from "./addtfiltercomp/addnewtask";
import { CloseDialogButton } from "./addtfiltercomp/closedialog";
import { CustomButton } from "../../AddtComponents/customButton";
import { context, filter } from "../../../types/types";

export const FilterbarComponent = ()=>{
    const {
        startDate,
        endDate,
        filters,
        setFilters,
        filterDefaultValues,
        setSortApplied,
        screenMedium
    } = useContext(appcontext) as context;

    useEffect(()=>{
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        if(startDate.current && endDate.current){
            startDate.current.max = yyyy + '-' + mm + '-' + dd;
            endDate.current.max = yyyy + '-' + mm + '-' + dd;
            startDate.current.value = filters.startDate;
            endDate.current.value = filters.endDate;
        }
    },[])

    const clrDateInput = ()=>{
        if(startDate.current && endDate.current){
            startDate.current.value = '';
            endDate.current.value = '';
        }
    }

    const handleClearDates = ()=>{
        clrDateInput();
        setFilters((prev: filter)=>{
            const obj={...prev};
            obj.startDate = '';
            obj.endDate = '';
            return obj;
        });
        if(endDate.current?.hasAttribute('min')) endDate.current.min = '';
    }

    const handleClearFilter = ()=>{
        setFilters(filterDefaultValues);
        const nameFilter = document.querySelector('.filterby-name') as HTMLInputElement;
        nameFilter.value = '';
        document.querySelector('.priority-btn.active')?.classList.remove('active');
        clrDateInput();
        setSortApplied(false);
        localStorage.setItem('sortApplied', 'false');
    }

    const handleAddFilter = (e: Event | React.MouseEvent<HTMLDivElement> | FormEvent<HTMLDivElement>)=>{
        const currentTarget = e.currentTarget as HTMLInputElement;
        const target = e.target as HTMLInputElement;
        const filter = (currentTarget)?.dataset.filter;

        function applyFilter(key=filter, value: string){
            setFilters((prev: filter)=>{
                function newObj(val: string){
                    const obj: filter = {...prev};
                        obj[key as keyof typeof prev] = val;
                    return obj;
                }
                if(prev[filter as keyof typeof prev] !== value) return newObj(value);
                else if(key === 'priority') return newObj('');
                return prev;
            });
        }

        if(filter === 'assignee') applyFilter(undefined, currentTarget?.value.trim());
        else if(filter === 'priority') applyFilter(undefined, target?.value);
        else{
            const start = startDate.current?.value;
            const end = endDate.current?.value;
            function setEndMin(){
                if(start){
                    applyFilter('startDate', start);
                    const endMin = new Date(start);
                    const yyyy = endMin.getFullYear();
                    const mm = String(endMin.getMonth() + 1).padStart(2, '0');
                    const dd = String(endMin.getDate()).padStart(2, '0');
                    if(endDate.current){
                        endDate.current.min = yyyy + '-' + mm + '-' + dd;
                    }
                }
            }
            start && setEndMin();
            end && applyFilter('endDate', end);
        }
    }

    const handleKeyboardEnter = (e: KeyboardEvent<HTMLInputElement>)=>{
        e.key === 'Enter' && handleAddFilter(e);
    }

    return (
        <div className="filterbar-comp">
                <span className="filterby-name-container">
                    Search by<span>:</span>
                    <input
                    className="filterby-name"
                    data-filter='assignee'
                    placeholder="Assignee name"
                    onKeyDown={handleKeyboardEnter}
                    defaultValue={filters.assignee}
                    />
                </span>
                <div className="filterby-priority">
                    <span>Priority</span>
                    <span>:</span>
                    <FilterbyPriorityComponent handleAddFilter={handleAddFilter} filters={filters}/>
                </div>
                <FilterbySortComponent/>
                <div className="filterby-date">
                    <div data-filter='date' onChange={handleAddFilter}>
                        <section><span>From : </span><input ref={startDate} type="date"/></section>
                        <section><span>To : </span><input ref={endDate} type="date"/></section>
                    </div>
                    <CustomButton text="clear date" callback={ handleClearDates }/>
                </div>
                <div className="filter-btngrp">
                    <CustomButton text="clear filters" callback={ handleClearFilter }/>
                    { screenMedium ? <CloseDialogButton/> : <AddTaskButton/> }
                </div>
        </div>
    )
}