"use client"
import { FormEvent, useRef, useState, useEffect } from "react"
import { getCorrections, getGPT } from "../lib/gpt"
import { Button, FormLabel, Heading, Input, Spinner, Stack, Textarea, FormControl } from "@chakra-ui/react"
import { ArrowIcon, NotesIcon, QuizIcon } from "../app/icons"
import Link from "next/link"
import { getDocs, collection, QueryDocumentSnapshot, DocumentData } from "firebase/firestore"
import Image from "next/image"
import { firestore } from "../lib/firebase"


const Home = () => {

    let [studySets, setStudySets] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[] | undefined>(undefined)

    useEffect(() => {

        const doAsync = async () => {

            const t = (await getDocs(collection(firestore, "/sets/"))).docs.filter((x,i) => i < 10)

            setStudySets(t)
        }

        doAsync()
    })

    return (
        <>
            <header
            id="header"
            className="px-10 pt-40 pb-16">
                <div  
                id="heading-wrap"
                className="pl-48 w-3/4">
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
            <section id="featured-sets" className="px-10">
                <h1 className="text-4xl font-semibold text-teal-500 mb-6">
                    Featured Sets
                </h1>
                <div className="grid gap-2" id="sets-grid ml-4">
                    {studySets?.map((set, i) => (
                    <div key={i}>
                        <Link href={`/set/${set.id}`} className="text-stone-200">
                            {JSON.stringify(set.data().title)}
                        </Link>
                    </div>
                ))}
                </div>
            </section>

        </>
    )
}

export default Home