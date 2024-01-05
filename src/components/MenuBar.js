"use client";
import Image from "next/image";
import { useState } from "react";
import {motion} from 'framer-motion';
import MenuButton from "./MenuButton";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const menuItems = [
    {
        name: "Accident",
    },
    {
        name: "Jam",
    },
    {
        name: "Travel",
    }

]

const menu = {
    open: {
        width: "100%",
        height: "480px",
        top: "-480px", // Position above the MenuBar
        left: "0px", // Align with the left edge of the MenuBar
        transition: {duration: 0.75, type:"tween", ease:[0.76, 0, 0.24, 1]}
    },
    closed: {
        width: "0px",
        height: "0px",
        top: "0px", // Position at the top-left corner of the MenuBar
        left: "0px", // Align with the left edge of the MenuBar
        transition: {duration: 0.75, delay:0.35, type:"tween", ease:[0.76, 0, 0.24, 1]}
    }
}

const MenuBar = ({onTypeSelect}) => {
    const [isActive, setIsActive] = useState(false)
    const handleMenuItemClick = (name) => {
        setIsActive(false)
        onTypeSelect(name.toLowerCase())
    }
    return (
        <div className="fixed px-12 py-4 bottom-[5%] left-1/2 translate-x-[-50%] bg-white rounded-xl z-[10000] menubar-shadow">
            <ul className="flex gap-4 text-slate-800 items-center justify-center select-none">
                <li
                > 
                    <MenuButton isActive={isActive} toggleMenu={()=>{setIsActive(!isActive)}}/>
                </li>
                {
                    menuItems.map((item, index)=>{
                        return (
                            <li 
                                className={`py-2 px-3 ${index==0 && "border-l border-slate-300"}`} 
                                key={item.name}
                                onClick={() => {
                                    handleMenuItemClick(item.name)
                                }}
                                >{item.name}
                                </li>
                        )
                    })
                }
                <li>
                    <Select>
                        <SelectTrigger className="w-[120px] rounded-xl border-slate-400">
                            <SelectValue placeholder="Switch"/>
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-lg">
                            <SelectGroup>
                                <SelectLabel>Type</SelectLabel>
                                <SelectItem value="dashboard">Dashboard</SelectItem>
                                <SelectItem value="map">Map</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </li>
            </ul>
            <motion.div 
                className="absolute bg-[#f64343] rounded-xl "
                variants={menu}
                animate={isActive?"open" : "closed"}
                initial="closed"
            >

            </motion.div>
        </div>
    )
}

export default MenuBar;