"use client"
import { FormEvent, useRef, useState } from "react"
import { getCorrections, getGPT } from "../lib/gpt"
import { Button, FormLabel, Heading, Input, Spinner, Stack, Textarea, FormControl } from "@chakra-ui/react"
import { ArrowIcon, NotesIcon, QuizIcon } from "../app/icons"
import Link from "next/link"

const Home = () => {

    return (
        <>
            <header
            id="header"
            className="px-10 pt-40 pb-16 bg-white">
                <div  
                id="heading-wrap"
                className="grid place-items-center w-3/4">
                    <div id="text-wrap">
                        <h1 
                        id="heading"
                        className="text-6xl text-slate-700 font-extrabold w-3/4"
                        >
                        Quick Study GPT
                        </h1>
                        <Heading as='h2' size='2xl'
                        className="text-teal-500 mt-4 font-bold">
                            Enhance your learning.
                        </Heading>
                        <div id="section-button" className="mt-10">
                            <div id="button-wrap" className="w-3/5">
                                <button 
                                className="w-full px-10 py-4 mt-6 tracking-wider text-white 
                                uppercase transition-colors duration-300 transform bg-teal-600 
                                rounded-lg lg:w-auto hover:bg-teal-500 focus:outline-none 
                                focus:bg-teal-500 font-extrabold text-lg">
                                    <div
                                    id="button-inner"
                                    className="grid grid-flow-col">
                                        <Link href="/set/create" className="hover:underline">
                                            Start Learning
                                        </Link>
                                        <div className="pl-3">
                                            <ArrowIcon />
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main 
            id="main-division"
            className="px-40 py-5 bg-white grid">

            </main>
        </>
    )
}

export default Home