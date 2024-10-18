"use client"

import { NextPage } from "next";
import Link from "next/link";
import { ArrowIcon } from "../../../app/icons";
import { useEffect, useState } from "react";
import { getGPT, getGPTInitial } from "../../../lib/gpt";
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";
import Loading from "../../../components/Loading";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore"
import { auth, firestore } from "../../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


const Page: NextPage = () => {

    let [notes, setNotes] = useState<string>("")
    let [questions, setQuestions] = useState<number>(10)
    let [title, setTitle] = useState<string | undefined>()
    let [folder, setFolder] = useState<string>("default")


    let [folders, setFolders] = useState<string[] | undefined>()
    let [user] = useAuthState(auth)


    useEffect(() => {
        
        if (!user) return

        const doAsync = async () => {

            let folders = JSON.parse((await getDoc(doc(firestore, `users/${user.uid}`))).data()?.sets)

            if (!folders) return

            setFolders(Object.keys(folders))
        }

        doAsync()
    })


    let [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()

    return (
        <>
            <Loading loading={loading} />
            <div id="header-wrap" className="px-32 py-20">
                <header className="font-extrabold text-5xl text-stone-300">
                    Create Set
                </header>
            </div>
            <form id="set-form" className="grid place-items-center gap-10" onSubmit={async (e) => {


                e.preventDefault()

                if (!user) return router.push('/sign-up')

                if (notes.length < 10) return alert("Notes must be at least 10 characters")
                    
                setLoading(true)

                const id = await getGPTInitial(notes, user.uid, questions, title ?? undefined, folder ?? undefined)

                setLoading(false)

                router.push(`/set/${id}`)
            }}>
                <div id="title" className="w-4/5">
                    <label 
                    htmlFor="Title" 
                    className="block text-xl mb-5 font-bold text-stone-300">
                        Title
                    </label>
                    <input 
                    id="title-input" 
                    className="bg-stone-800 border border-stone-500 text-stone-300 
                    text-sm rounded-lg focus:ring-blue-500 font-bold
                    focus:border-blue-500 block p-2.5 w-1/3 placeholder-stone-400/70" 
                    placeholder="Biology Unit A"
                    onChange={e => setTitle(e.currentTarget.value)}
                    required />
                </div>
                <div id="folder" className="w-4/5">
                    <label 
                    htmlFor="Folder" 
                    className="block text-xl mb-5 font-bold text-stone-300">Folder</label>
                    <select 
                    onChange={e => {

                        let val = e.currentTarget.value

                        setFolder(val === "no folder" ? "default" : val)
                    }}
                    id="folders-select" 
                    size={folders ? 
                        folders.length > 5 ? folders.length : 5
                        : 0
                    } 
                    className="bg-stone-800 border border-stone-500 text-stone-300 font-bold text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-1/2">
                        {folders?.map((folder, i) => (
                            <option key={i} selected={folder === "default"}>
                                {folder === "default" ? "no folder" : folder}
                            </option>
                        ))}
                    </select>
                </div>
                <div id="textarea" className="w-4/5">
                    <label 
                    htmlFor="Notes" 
                    className="block text-xl mb-5 font-bold text-stone-300 dark:text-gray-300">
                        Notes
                    </label>
                    <textarea 
                    onChange={(e) => {setNotes(e.target.value)}}
                    placeholder="Copy & Paste Notes Here" 
                    className="block  mt-2 w-full placeholder-stone-400/70 font-bold
                    rounded-lg border border-gray-500 text-stone-300
                    bg-stone-800 px-4 h-64 py-2.5 focus:border-blue-400
                    focus:outline-none focus:ring focus:ring-green-300 
                    focus:ring-opacity-40"></textarea>
                </div>
                <div id="questions" className="w-4/5">
                    <div id="questions-inner" className="w-1/3">
                        <label 
                        htmlFor="question"
                        className="block mb-3 font-bold text-gray-300">
                            # of Questions
                        </label>
                        <input 
                        type="number" 
                        id="number-input" 
                        className="bg-stone-800 border border-gray-500 text-stone-300 
                        text-sm rounded-lg focus:ring-blue-500 font-bold
                        focus:border-blue-500 block p-2.5 w-1/3 placeholder-stone-400/70" 
                        placeholder="10"
                        min={5}
                        max={20}
                        onChange={e => {
                            try {
                                
                                let x = parseInt(e.currentTarget.value)
                                setQuestions(x)
                            } catch (e) {
                                alert("Not number")
                            }
                        }}
                        required />
                    </div>
                </div>
                <div id="section-button" className="w-4/5 pl-6">
                    <div id="button-wrap">
                        <button 
                        type="submit"
                        className="w-full px-10 py-4 mt-6 tracking-wider text-white 
                        uppercase transition-colors duration-300 transform bg-teal-600 
                        rounded-lg lg:w-auto hover:bg-teal-500 focus:outline-none 
                        focus:bg-teal-500 font-extrabold text-lg"
                        >
                            <div
                            id="button-inner"
                            className="grid grid-flow-col">
                                Create Set
                                <div className="pl-3">
                                    <ArrowIcon />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Page