"use client"
import React, { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Autocomplete } from '@react-google-maps/api'
import { useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
const TravelDashboard = ({onTravelSubmit}) => {
  const autoComplete1Ref = useRef()
  const input1Ref = useRef()
  const autoComplete21Ref = useRef()
  const input2Ref = useRef()
  const options = {
    componenetRestrictions:{country: "ng"},
    fields:["address_components", "geometry", "icon", "name"],
    types: ["establishment"]
  }
  useEffect(()=>{
    autoComplete1Ref.current = new window.google.maps.places.Autocomplete(
      input1Ref.current,
      options
     )
    autoComplete21Ref.current = new window.google.maps.places.Autocomplete(
      input2Ref.current,
      options
    )
  })
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')

  const handleSubmit = () => {
    onTravelSubmit(source, destination)
  }

  return (
    <div className='w-full h-full rounded-xl flex flex-col items-center justify-center shadow-lg border gap-6'>
      <div className="grid w-[80%] max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Source Point</Label>
        <Input className="rounded-[5px]" type="text" id="source" onChange={(e)=>setSource(e.target.value)} placeholder="Where do you want to start ?" ref={input1Ref} />
      </div>
      <div className="grid w-[80%] max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Destination</Label>
        <Input className="rounded-[5px]" type="text" id="destination" onChange={(e)=>setDestination(e.target.value)} placeholder="Where do you want to go ?" ref={input2Ref} />
      </div>
      <Button className="bg-black rounded-[7.5px] text-white hover:bg-white hover:text-black hover:shadow-md hover:border-slate-400" onClick={handleSubmit} >Find out</Button>

    </div>
  )
}

export default TravelDashboard