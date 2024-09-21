"use client"
import { FormEvent, useRef, useState } from "react"
import { getCorrections, getGPT } from "../lib/gpt"
import { Button, FormLabel, Heading, Input, Spinner, Stack, Textarea, FormControl } from "@chakra-ui/react"
import { NotesIcon, QuizIcon } from "./icons"

const Home = () => {



    

    return (
        <>
            <header
            id="header"
            className="px-10 py-40 bg-white">
                <div  
                id="heading-wrap"
                className="pl-72">
                    <div id="text-wrap">
                        <Heading 
                        id="heading"
                        className="text-7xl text-slate-700 font-extrabold"
                        >
                        Quick Study GPT
                        </Heading>
                        <Heading as='h2' size='2xl'
                        className="text-teal-500 mt-4 font-bold">
                            Enhance your learning.
                    </Heading>
                    </div>
                </div>
            </header>
            <main 
            id="main-division"
            className="h-screen px-40 py-5 bg-white">
                
            
            </main>
        </>
    )
}

export default Home