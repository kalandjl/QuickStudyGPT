"use client"
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { auth, firestore } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { DeleteIcon } from "../../../app/icons"
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
    updateState: React.Dispatch<React.SetStateAction<boolean[]>>
    state: boolean[]
    index: number
    id: string
}

const AddToFolderModal: FC<Props> = (props) => {


    const router = useRouter()
    let [folders, setFolders] = useState<string[]>([])
    let [foldersActive, setFoldersActive] = useState<boolean[]>([])

    let [user] = useAuthState(auth)

    useEffect(() => {

        const doAsync = async () => {

            if (!user) return

            const t = Object.keys(JSON.parse((await getDoc(doc(firestore, `/users/${user.uid}`))).data()?.sets))

            if (!t) return

            setFolders(t)

            console.log(t)

            setFoldersActive(t.map(x => false))
        }

        doAsync()
    }, [user])

    useEffect(() => {console.log(foldersActive)}, [foldersActive])

    return (
        <div className="z-50 w-96">
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <div>
                        <div className="mt-2 text-center">
                            <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">Add to Folder</h3>
                            <div id="folder-select-container" className="flex gap-3 justify-evenly w-auto mt-5">
                                {folders.map((folder, i) => (
                                    <div key={i}>
                                            <button className={`px-3 py-1 bg-red-500 rounded-md font-bold
                                            ${foldersActive[i] ? "bg-gray-500" : "bg-gray-300"}`}
                                            onClick={() => {
                                                setFoldersActive(foldersActive.map((y, u) => {
                                                    if (u === i) {
                                                        return y ? false : true
                                                    }
                                                    
                                                    return false
                                                }))
                                            }}>
                                                {folder}
                                            </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 grid place-items-center">
                        <div className="w-3/5 flex justify-between">
                            <button 
                            onClick={() => {

                                const newState = [...props.state];
                                newState[props.index] = false; // Set the current modal state to false (close)
                                props.updateState(newState);
                            }}
                            className="hover:cursor-pointer w-full px-4 py-2 mt-2 text-sm font-medium 
                            tracking-wide text-gray-700 capitalize transition-colors duration-300 
                            transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 
                            dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 
                            hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 
                            focus:ring-opacity-40">
                                Cancel
                            </button>

                            <button 
                            onClick={async (e) => {
                                
                                const runUpdate = async () => {

                                    if (!user) return 

                                    const sets = JSON.parse((await getDoc(doc(firestore, `/users/${user.uid}`))).data()?.sets ?? {})
                                    
                                    if (!sets) return 

                                    let selectedFolder = folders[foldersActive.indexOf(true)]


                                    if (sets.hasOwnProperty(selectedFolder)) {

                                        if (sets[selectedFolder].some((str: string) => str.includes(props.id))) return

                                        updateDoc(doc(firestore, `/users/${user.uid}`), {
                                            sets: JSON.stringify({...sets, [selectedFolder]: [...sets[selectedFolder], props.id]})
                                        })
                                    } else {
                                        updateDoc(doc(firestore, `/users/${user.uid}`), {
                                            sets: JSON.stringify({...sets, [selectedFolder]: [props.id]})
                                        })
                                    }

                                }

                                try {
                                    runUpdate()
                                } catch (e) {
                                    console.error(e)
                                }
                                
                                const newState = [...props.state];
                                newState[props.index] = false; // Set the current modal state to false (close)
                                props.updateState(newState);
                            }}
                            className="hover:cursor-pointer w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide 
                            text-white capitalize transition-colors duration-300 transform bg-purple-600 rounded-md 
                            sm:w-auto sm:mt-0 hover:bg-purple-800 focus:outline-none focus:ring focus:ring-red-400 
                            focus:ring-opacity-40">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddToFolderModal