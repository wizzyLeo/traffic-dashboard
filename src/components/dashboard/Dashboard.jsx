"use client"
import React, { useEffect, useState } from 'react'
import AccidentDashboard from './AccidentDashboard'
import JamDashboard from './JamDashboard'
import TravelDashboard from './TravelDashboard'
import Map from '../Map'
import * as d3 from 'd3'
const csvFilePath = '/data/taipei_accident.csv'
let heatmapData
let dateData
d3.csv(csvFilePath).then(data => {
    // Extract 'lat' and 'lng' columns and convert them to numbers
    heatmapData = data.map(d => ({
        lat: +d.lat,
        lng: +d.lng
    }));
    dateData = data.map(d => ({
        year: +d.year + 1911,
        month: +d.month,
        day: +d.day
    }))
    console.log(dateData);
}).catch(error => {
    console.error('Error loading the CSV file:', error);
});


const Dashboard = ({type}) => {
    
    // jam dashboard
    const [source, setSource] = useState("National Yangming Chiaotung University")
    const [destination, setDestination] = useState("Taipai 101")
    const [directions, setDirections] = useState([])
    useEffect(()=>{
        console.log('type: ', type)
        console.log('source: ', source)
        console.log('destination: ', destination)

        console.log('directions', directions)

    }, [source, destination, directions])
    const onTravelSubmit = (source, destination) => {
        setSource(source)
        setDestination(destination)
    }
  return (
    <div className={`w-screen grid  ${type==='jam'?'grid-cols-1' : 'grid-cols-2'} h-[900px] p-4`}>
        {(type !== 'jam') && <div className='flex items-center justify-center p-6'>
            {(type === 'accident') && <AccidentDashboard/>}
            {(type === 'jam') && <JamDashboard
                                />}
            {(type === 'travel') && <TravelDashboard
                                    onTravelSubmit={onTravelSubmit}
                                    directions={directions}
                                />}
        </div>}
        <div className='flex items-center justify-center p-6'>
            <Map type={type} source={source} destination={destination} heatmapData={heatmapData} setDirections={setDirections}/>
        </div>
    </div>
  )
}

export default Dashboard