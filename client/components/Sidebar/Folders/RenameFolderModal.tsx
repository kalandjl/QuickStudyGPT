import { FC, useState } from "react";
import { DeleteIcon } from "../../../app/icons";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../lib/firebase";

interface Props {
    updateState: React.Dispatch<React.SetStateAction<boolean[]>>
    state: boolean[]
    folder: string
    uid: string
    index: number
}

const RenameFolderModal: FC<Props> = (props) => {

    let router = useRouter()
    let [newFolder, setNewFolder] = useState<string>("")

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
                                <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">Rename Folder</h3>
                                <div id="input-wrap" className="w-64">
                                    <input
                                    placeholder="New Folder Name"
                                    className="mt-2 text-sm text-gray-500 dark:text-gray-400 w-full rounded-md
                                    px-2 py-1 ring-1 ring-gray-400 
                                    focus:ring-green-600 focus:ring-2"
                                    onChange={e => setNewFolder(e.currentTarget.value)} />
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

                                    try {
                                        
                                        const sets = JSON.parse((await getDoc(doc(firestore, `/users/${props.uid}`)))?.data()?.sets || {}) 
                                        
                                        if (!sets) return
                                        if (sets.hasOwnProperty(newFolder)) {alert("This folder name already exists"); throw Error("")}

                                       
                                        await updateDoc(doc(firestore, `/users/${props.uid}`), {
                                            "sets": JSON.stringify({...Object.fromEntries(
                                                Object.entries(sets).filter(([key]) => key !== props.folder)
                                            ), 
                                            [newFolder]: sets[props.folder]})
                                        })
                                    } catch (e) {

                                        console.error(e)
                                    }

                                    const newState = [...props.state];
                                    newState[props.index] = false; // Set the current modal state to false (close)
                                    props.updateState(newState);
                                }}
                                className="hover:cursor-pointer w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide 
                                text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-md 
                                sm:w-auto sm:mt-0 hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 
                                focus:ring-opacity-40">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RenameFolderModal