"use client"
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ConvertKeysToLowerCase } from "../../../lib/misc/strings";
import Link from "next/link";

const Home: NextPage<{params: any}> = ({ params }) => {

    let [loading, setLoading] = useState<boolean>(false)
    let [sets, setSets] = useState<any[] | undefined>()
    const id: string= params.id

    let [user] = useAuthState(auth)

    useEffect(() => {

        if (!user || !id) return

        let doAsync = async () => {

            let t = ConvertKeysToLowerCase(JSON.parse((await getDoc(doc(firestore, `/users/${user.uid}`))).data()?.sets))

            if (!t) return

            let populatedSets = await Promise.all(t[id.replace("%20", " ")].map(async (x: string) => {

                return {...(await getDoc(doc(firestore, `/sets/${x}`))).data(), ...{id: x}}
            }))

            setSets(populatedSets)
        }

        doAsync()

    }, [user])

    useEffect(() => console.log(sets), [sets])

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


