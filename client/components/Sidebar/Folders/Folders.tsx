"use client";
import { FC, useEffect, useState } from "react";
import { auth, firestore } from "../../../lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import FolderOps from "./Ops/FolderOps";

interface Props {
    reload: React.Dispatch<React.SetStateAction<boolean>>
}

const Folders: FC<Props> = (props) => {
    const [user] = useAuthState(auth);
    const [docs, setDocs] = useState<{ [folder: string]: any[] }>({});
    const [loading, setLoading] = useState(true);
    const [hoverTrack, setHoverTrack] = useState<boolean[]>([])

    useEffect(() => {

        if (!user) return

        const fetchData = async () => {
        try {
            const userDoc = await getDoc(doc(firestore, `/users/${user.uid}`))
            const sets = JSON.parse(userDoc?.data()?.sets || {})

            let temp: { [folder: string]: any[] } = {}

            // Use `for...of` to properly await each folder processing
            for (const folder of Object.keys(sets)) {

            const setIds = sets[folder]

            const folderDocs = await Promise.all(
                setIds.map(async (set: any) => {
                
                    const docRef = await getDoc(doc(firestore, `/sets/${set}`))
                    return docRef.exists() ? { id: docRef.id, ...docRef.data() } : null
                })
            )

            // Filter out any null documents (if they don't exist)
            temp[folder] = folderDocs.filter((doc) => doc !== null);
            }

            setDocs(temp)
            setLoading(false) // Set loading to false after the documents have been fetched
        } catch (error) {
            setLoading(false)
        }
        }

        fetchData()
    }, [user])

    useEffect(() => {

        setHoverTrack(Object.keys(docs).map(x => false))
    }, [docs])


    if (loading) return <div>Loading...</div> // Show a loading state while data is being fetched

    return (
        <div className="grid gap-2 grid-flow-row" id="folders-container">
            {Object.keys(docs).length > 0 ? (
            Object.keys(docs).map((folder, i) => (
                <div key={i}>
                    <div className={`flex justify-between w-full rounded-md hover:bg-gray-300 
                    transition ease-in-out px-2`}
                    id="folder-flex"
                    onMouseEnter={() => setHoverTrack(hoverTrack.map((p, y) => {
                        if (y === i) return true
                        return false
                    }))}
                    onMouseLeave={() => setHoverTrack(hoverTrack.map((p, y) => {
                        if (y === i) return false
                        return false
                    }))}>
                            <h2 className="text-2xl font-bold">
                                {folder === "default" ? "" : folder}
                            </h2>
                            <div className="grid place-items-center w-min">
                                {user && folder !== "default" ? 
                                <FolderOps folder={folder} uid={user.uid} state={hoverTrack} index={i} reload={props.reload} />        
                                :
                                <></>
                                }   
                            </div>
                    </div>
                    <div className="pl-4"></div>
                    <div className={`pl-${folder === "default" ? "0" : "4"}`} id="sets-container">
                        {docs[folder]?.length > 0 ? (
                            docs[folder].map((doc: any, y: number) => (
                            <Link href={`/set/${doc.id}`} key={y}>
                                <p className="font-semibold hover:underline">{doc.title}</p>
                            </Link>
                            ))
                        ) : (
                            <p className="text-gray-500">No documents available</p>
                        )}
                    </div>
                </div>
            ))
            ) : (
            <p className="text-gray-500">No folders found</p>
            )}
        </div>
    )
}

export default Folders
