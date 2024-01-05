import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
  } from "@/components/ui/select"
  


const SearchSection = () => {
  return (
    <div className='p-8 rounded-lg border-slate-400 text-black'>
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <Select>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select your region"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Taiwan</SelectLabel>
                            <SelectItem value="tpe">Taipei</SelectItem>
                            <SelectItem value="khh">Kaohsiung</SelectItem>
                            <SelectItem value="txg">Taichung</SelectItem>
                            <SelectItem value="tnn">Tainan</SelectItem>
                            <SelectItem value="hsz">Hsinchu</SelectItem>
                            <SelectItem value="tyn">Taoyuan</SelectItem>
                            <SelectItem value="keo">Keelung</SelectItem>
                            <SelectItem value="hun">Hualien</SelectItem>
                            <SelectItem value="yln">Yilan</SelectItem>
                            <SelectItem value="cyq">Chiayi</SelectItem>
                            <SelectItem value="mia">Miaoli</SelectItem>
                            <SelectItem value="nan">Nantou</SelectItem>
                            <SelectItem value="pen">Penghu</SelectItem>
                            <SelectItem value="pif">Pingtung</SelectItem>
                            <SelectItem value="ttt">Taitung</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>

    </div>
  )
}

export default SearchSection