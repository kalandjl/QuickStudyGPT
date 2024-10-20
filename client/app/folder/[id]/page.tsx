"use client"
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ConvertKeysToLowerCase } from "../../../lib/misc/strings";
import Link from "next/link";
import { notFound } from "next/navigation";
import useAuth from "../../../utils/useAuth";

const Home: NextPage<{params: any}> = ({ params }) => {

    let [loading, setLoading] = useState<boolean>(false)
    let [sets, setSets] = useState<any[] | undefined>()
    let [loadFailed, setLoadFailed] = useState<boolean>(false)
    const id: string= params.id

    const [user] = useAuth(window.localStorage.getItem("accessToken"))

    useEffect(() => {

        if (!user || !id) return

        let doAsync = async () => {

            let t = ConvertKeysToLowerCase(JSON.parse((await getDoc(doc(firestore, `/users/${user.uid}`))).data()?.sets))[id.replace("%20", " ")]

            if (!t) return setLoadFailed(true)

            let populatedSets = await Promise.all(t.map(async (x: string) => {

                return {...(await getDoc(doc(firestore, `/sets/${x}`))).data(), ...{id: x}}
            }))

            setSets(populatedSets)
        }

        doAsync()

    }, [user])

    if (loadFailed) notFound()

    return (
        <>  
            {loading ? <div className="text-stone-300">loading...</div> : <></>}
            {sets && !loading ? 
            <>  
                <div id="header-wrap" className="px-40 py-20">
                    <header className="font-extrabold text-5xl text-stone-200">
                        {id.replace("%20", " ")
                            .split(" ")
                            .map((word) => word[0].toUpperCase() + word.slice(1))
                            .join(' ')
                        }
                    </header>
                </div>   
                <div id="sets-wrap" className="px-48">
                    {sets.map((set, i) => (
                        <div key={i} className="text-stone-300">
                            <Link href={`/set/${set.id}`}>
                                <p className="hover:underline">
                                    {set.title}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            </> 
            : <></>}
        </>
    )
}

export default Home


