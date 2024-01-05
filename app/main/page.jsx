"use client"
import Dashboard from "@/components/dashboard/Dashboard";
import { useEffect, useState } from "react";

const { default: Header } = require("@/components/Header")
const { default: MenuBar } = require("@/components/MenuBar")


const MainPage = () => {
    const [selectedType, setSelectedType] = useState('accident')
    const handleTypeSelect = (type) => {
        setSelectedType(type)
    }
    useEffect(()=>{
        console.log('type:', selectedType)
    },[selectedType] )
    return (
        <>
            <Header isMainPage={true}/>
            <Dashboard type={selectedType} />
            <MenuBar onTypeSelect={handleTypeSelect}/>
        </>
    )
}

export default MainPage;