"use client"
import { FormEvent, useRef, useState } from "react"
import { getCorrections, getGPT } from "../lib/gpt"
import { Button, FormLabel, Heading, Input, Spinner, Stack, Textarea, FormControl } from "@chakra-ui/react"
import { ArrowIcon, NotesIcon, QuizIcon } from "./icons"
import Link from "next/link"

const Home = () => {



    

    return (
        <>
            <header
            id="header"
            className="px-10 pt-40 pb-16 bg-white">
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
            className="px-40 py-5 bg-white grid">
                <div id="section-button" className="grid place-items-center">
                    <div id="button-wrap" className="w-3/5">
                        <button 
                        className="w-full px-10 py-4 mt-6 tracking-wider text-white 
                        uppercase transition-colors duration-300 transform bg-teal-600 
                        rounded-lg lg:w-auto hover:bg-teal-500 focus:outline-none 
                        focus:bg-teal-500 font-extrabold text-lg">
                            <div
                            id="button-inner"
                            className="grid grid-flow-col">
                                <Link href="/set/create">
                                    Start Learning
                                </Link>
                                <div className="pl-3">
                                    <ArrowIcon />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home