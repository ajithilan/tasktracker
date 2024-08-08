import React from "react"
import { StatusButton } from "./statusbutton";

export const Scrolleasy = ()=>{

    const handleScroll = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        const target = e.target as HTMLButtonElement;
        function scrollintoview(){
            const scrollToElement = document.querySelector(`.task-${target.dataset.scroll}`);
            scrollToElement?.scrollIntoView({behavior:'smooth', block:'center'});
        }
        target.tagName === 'BUTTON' && scrollintoview();
    }

    return (
        <div className="scroll-easy" onClick={handleScroll}>
            <StatusButton text="pending" color="#7d7c7ccc" hoveredColor="#7d7c7cea"/>
            <StatusButton text="inprogress" color="#ffae45d8" hoveredColor="#ffae45d8"/>
            <StatusButton text="completed" color="#008170b4" hoveredColor="#008170d5"/>
            <StatusButton text="deployed" color="#1b1a55a2" hoveredColor="#1b1a55cb"/>
            <StatusButton text="deffered" color="#ff8f95c2" hoveredColor="#ff8f95e1"/>
        </div>
    )
}