"use client"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FC, useState } from "react";
import { firestore } from "../../../lib/firebase";

interface Props {
    updateState: React.Dispatch<React.SetStateAction<boolean[]>>
    state: boolean[]
    index: number
    uid: string
}

const NewFolderModal: FC<Props> = (props) => {

    let [folderName, setFolderName] = useState<string>("")

    return (
        <>
            <div className="z-50">
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom 
                    transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 
                    sm:my-8 sm:align-middle sm:w-full sm:p-6">
                        <div>
                            <div className="mt-2 text-center">
                                <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">Create Folder</h3>
                                <div id="input-wrap" className="w-64">
                                    <input
                                    placeholder="Folder Name"
                                    className="mt-2 text-sm text-gray-500 dark:text-gray-400 w-full rounded-md
                                    px-2 py-1 ring-1 ring-gray-400 
                                    focus:ring-green-600 focus:ring-2"
                                    onChange={e => setFolderName(e.currentTarget.value)} />
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
                                onClick={(e) => {

                                    const runUpdate = async () => {

                                        const userDoc = (await getDoc(doc(firestore, `/users/${props.uid}`))).data()

                                        if (!userDoc) return 
                                        if (JSON.parse(userDoc.sets).hasOwnProperty(folderName)) return

    
                                        updateDoc(doc(firestore, `/users/${props.uid}`), {
                                            sets: JSON.stringify({...JSON.parse(userDoc.sets), [folderName]: []})
                                        })
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
                                text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-md 
                                sm:w-auto sm:mt-0 hover:bg-green-800 focus:outline-none focus:ring focus:ring-red-300 
                                focus:ring-opacity-40">
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewFolderModal