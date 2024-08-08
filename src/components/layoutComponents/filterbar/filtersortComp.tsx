import { FormControl, InputLabel, MenuItem } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext, useEffect, useState } from "react"
import { appcontext } from "../../../App";
import { formStyling, labelStyling, selectStyling, menuItemStyling } from "../allbutttonstyles/buttonStyle";
import { context } from "../../../types/types";

export const FilterbySortComponent = ()=>{
    const {
        filters,
        sortApplied,
        setSortApplied,
        screenMobile
    } = useContext(appcontext) as context;
    const [sortText, setSortText] = useState(sortApplied ? 'priority' : '');
    const [sortDisabled, setSortDisabled] = useState(!!filters.priority);

    useEffect(() => {
        if(filters.priority){
            if(sortApplied){
                setSortApplied(false);
                setSortText('');
                localStorage.setItem('sortApplied','false');
            }
            setSortDisabled(true);
        }else setSortDisabled(false);
    }, [filters.priority]);
    
    const handleSort = (e: SelectChangeEvent)=>{
        const sortValue = e.target.value;
        if(sortValue){
            setSortApplied(true);
            setSortText(sortValue);
            localStorage.setItem('sortApplied','true');
        }else{
            localStorage.setItem('sortApplied', 'false');
            setSortApplied(false);
            setSortText(sortValue);
        }
    }

    return (
        <div className="filterby-sort">
            <FormControl sx={formStyling} size="small" disabled={sortDisabled}>
                <InputLabel
                sx={{...labelStyling, ...(filters.priority && {color:'rgba(0,0,0,.2)'})}}
                shrink={false}
                id="select-sort"
                >
                    sort by
                </InputLabel>
                <Select
                    sx={{...selectStyling, ...(screenMobile && {fontSize:'12px'})}}
                    labelId="select-sort"
                    id="select-sort-btn"
                    label="Sort"
                    value={sortText}
                    onChange={handleSort}
                >
                    <MenuItem sx={menuItemStyling} value=''>None</MenuItem>
                    <MenuItem sx={menuItemStyling} value='priority'>priority</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}