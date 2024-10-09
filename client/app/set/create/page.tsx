"use client"

import { NextPage } from "next";
import Link from "next/link";
import { ArrowIcon } from "../../../app/icons";
import { useEffect, useState } from "react";
import { getGPT, getGPTInitial } from "../../../lib/gpt";
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";
import Loading from "../../../components/Loading";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { auth, firestore } from "../../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


const Page: NextPage = () => {

    let [notes, setNotes] = useState("")
    let [loading, setLoading] = useState(false)

    let [user] = useAuthState(auth)

    const router = useRouter()

    return (
        <>
            <Loading loading={loading} />
            <div id="header-wrap" className="px-40 py-20">
                <header className="font-extrabold text-5xl text-slate-800">
                    Create Set
                </header>
            </div>
            <div id="textarea-wrap" className="grid place-items-center">
                <div id="textarea" className="w-4/5">
                    <label 
                    htmlFor="Notes" 
                    className="block text-xl mb-5 font-bold text-gray-500 dark:text-gray-300">
                        Notes
                    </label>
                    <textarea 
                    onChange={(e) => {setNotes(e.target.value)}}
                    placeholder="Copy & Paste Notes Here" 
                    className="block  mt-2 w-full placeholder-gray-500/70 font-bold
                     rounded-lg border border-gray-500
                    bg-white px-4 h-64 py-2.5 text-gray-700 focus:border-blue-400
                    focus:outline-none focus:ring focus:ring-green-300 
                    focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 
                    dark:text-gray-700 dark:focus:border-blue-300"></textarea>
                </div>
                <div id="section-button" className="w-4/5 pl-10">
                    <div id="button-wrap">
                        <button 
                        className="w-full px-10 py-4 mt-6 tracking-wider text-white 
                        uppercase transition-colors duration-300 transform bg-teal-600 
                        rounded-lg lg:w-auto hover:bg-teal-500 focus:outline-none 
                        focus:bg-teal-500 font-extrabold text-lg"
                        onClick={async (e) => {

                            if (!user) return router.push('/sign-up')

                            if (notes.length < 10) return alert("Notes must be at least 10 characters")
                                
                            setLoading(true)

                            const id = await getGPTInitial(notes, user.uid)

                            setLoading(false)

                            router.push(`/set/${id}`)
                        }}>
                            <div
                            id="button-inner"
                            className="grid grid-flow-col">
                                <Link href="/set/create">
                                    Quiz Me
                                </Link>
                                <div className="pl-3">
                                    <ArrowIcon />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page