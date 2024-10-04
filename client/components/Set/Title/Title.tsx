"use client"
import { FC, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

interface Title {
    title: string
}

const Title: FC<Title> = (props) => {

    let [title, setTitle] = useState(props.title)

    return (
        <>
            <input type="text"
            className="px-5 py-2 rounded-lg
            border-4 border-dashed
            text-6xl
            border-gray-200
            hover:border-gray-400 
            focus:border-blue-500 focus:border-opacity-80 focus:text-gray-700 focus:border-4 focus:border-solid"
            defaultValue={props.title} 
            onChange={e => setTitle(e.target.value)}/>
            {title === props.title ? <></> :
            <>
                <ArrowRightIcon />
            </>}
        </>
    )
}

export default Title