import React, { useEffect } from "react";
import { filter } from "../../../types/types";

interface priority {
    handleAddFilter: (event: Event | React.MouseEvent<HTMLDivElement>) => void;
    filters: filter;
}

export const FilterbyPriorityComponent = ({handleAddFilter, filters}: priority)=>{

    useEffect(()=>{
        document.querySelector(`.priority-btn-${filters.priority}`)?.classList.add('active');
    },[])

    const handleSelect = (e: React.MouseEvent<HTMLDivElement>)=>{
        const target = e.target as HTMLDivElement;
        const activeElement = document.querySelector('.priority-btn.active');
        activeElement?.classList.remove('active');
        target !== activeElement && target.classList.toggle('active');
        handleAddFilter(e);
    }

    return (
        <div className="filterby-priority-comp" data-filter='priority' onClick={handleSelect}>
            <button className="priority-btn priority-btn-P0" value='P0'>P0</button>
            <button className="priority-btn priority-btn-P1" value='P1'>P1</button>
            <button className="priority-btn priority-btn-P2" value='P2'>P2</button>
        </div>
    )
}