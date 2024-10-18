"use client"
import { doc, getDoc } from "firebase/firestore";
import { NextPage } from "next";
import { auth, firestore } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import Link from "next/link";

const Home: NextPage = () => {

    let [user] = useAuthState(auth)
    let [folders, setFolders] = useState<string[] | undefined>(undefined)

    useEffect(() => {

        if (!user) return

        const doAsync = async () => {

            let res = (await getDoc(doc(firestore, `/users/${user.uid}`))).data()

            if (!res) return

            setFolders(Object.keys(JSON.parse(res.sets)).filter(folder => folder != "default"))
        }

        doAsync()
    }, [user])

    return (
        <>
            <div id="header-wrap" className="px-40 py-20">
                <header className="font-extrabold text-5xl text-stone-200">
                    Folders
                </header>
            </div>            
            <div 
            id="folders-wrap"
            className="grid py-8 px-40">
                <div id="folders-flex" className="flex gap-4">
                    {
                        folders?.map((folder, i) => (
                            <div key={i}>
                                <Link href={`/folder/${folder.toLocaleLowerCase()}`}>
                                    <div className="px-3 py-2 bg-emerald-500 transition ease-in-out 
                                    hover:bg-emerald-600 rounded-lg font-semibold">
                                        {folder}
                                    </div>
                                </Link>
                            </div>
                        ))
                    }              
                </div>
            </div>
        </>
    )
}

export default Home