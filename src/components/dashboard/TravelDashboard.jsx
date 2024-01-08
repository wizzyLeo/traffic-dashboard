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
const TravelDashboard = ({onTravelSubmit, directions}) => {
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
      {(directions.length > 0) && (
        <div className="font-sans h-[400px] w-4/5 flex overflow-scroll shadow-md p-6 flex-col items-center justify-between">
          <div className="text-xl  flex justify-left w-full p-2 text-[40px]">Directions</div><br/>
          <ol className="list-decimal list-inside rounded-xl border-slate-400">
            {directions.map((step, index) => (
              <li className='mt-2 mb-2 px-4 py-2 rounded-[5px] overflow-hidden shadown-md border-slate-400 bg-slate-100' key={index} dangerouslySetInnerHTML={{ __html: step }} />
            ))}
          </ol>
        </div> 
      )}
    </div>
  )
}

export default TravelDashboard