"use client"
import { FormEvent, useRef, useState } from "react"
import { getCorrections, getGPT } from "../lib/gpt"
import { Button, FormLabel, Heading, Input, Spinner, Stack, Textarea, FormControl } from "@chakra-ui/react"
import { ArrowIcon, NotesIcon, QuizIcon } from "../app/icons"
import Link from "next/link"
import Image from "next/image"

const Home = () => {

    return (
        <>
            <Image 
            src="/../public/logo.png"
            height={100}
            width={10}
            alt="a" />
            <header
            id="header"
            className="px-10 pt-40 pb-16">
                <div  
                id="heading-wrap"
                className="grid place-items-center w-3/4">
                    <div id="text-wrap">
                        <h1 
                        id="heading"
                        className="text-6xl text-gray-300 font-extrabold w-3/4"
                        >
                        Quick Study GPT
                        </h1>
                        <Heading as='h2' size='2xl'
                        className="text-teal-500 mt-4 font-bold">
                            Enhance your learning.
                        </Heading>
                        <div id="section-button" className="mt-10">
                            <div id="button-wrap" className="w-3/5">
                                <Link href="/set/create" className="hover:underline">
                                    <button 
                                    className="w-full px-10 py-4 mt-6 tracking-wider text-white 
                                    uppercase transition-colors duration-300 transform bg-teal-600 
                                    rounded-lg lg:w-auto hover:bg-teal-500 focus:outline-none 
                                    focus:bg-teal-500 font-extrabold text-lg">
                                        <div
                                        id="button-inner"
                                        className="grid grid-flow-col hover:underline">
                                                Make your first study set
                                            <div className="pl-3">
                                                <ArrowIcon />
                                            </div>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main 
            id="main-division"
            className="px-40 py-5 grid">

            </main>
        </>
    )
}

export default Home