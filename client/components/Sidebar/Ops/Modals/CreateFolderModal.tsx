"use client"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FC, useState } from "react";
import { firestore } from "../../../../lib/firebase";

interface Props {
    updateState: React.Dispatch<React.SetStateAction<boolean[]>>
    state: boolean[]
    index: number
    uid: string
    reload: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateFolderModal: FC<Props> = (props) => {

    let [folderName, setFolderName] = useState<string>("")

    return (
        <>
            <div className="px-10">
                <div>
                    <div className="mt-2 text-center">
                        <h3 className="text-lg font-medium leading-6 text-stone-400 capitalize dark:text-white" id="modal-title">Create Folder</h3>
                        <div id="input-wrap" className="w-64 mt-6 mb-10">
                            <input
                            placeholder="Folder Name"
                            className="mt-2 text-sm text-gray-500 dark:text-gray-400 w-full rounded-md
                            px-2 py-1 ring-2 ring-gray-400 bg-transparent
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
                    tracking-wide capitalize transition-colors duration-300 rounded-md sm:mt-0 sm:w-auto sm:mx-2 
                    hover:bg-stone-400 focus:outline-none focus:ring focus:ring-gray-300 
                    focus:ring-opacity-40 bg-stone-300">
                            Cancel
                        </button>

                        <button 
                        onClick={(e) => {

                            const runUpdate = async () => {

                                const userDoc = (await getDoc(doc(firestore, `/users/${props.uid}`))).data()

                                console.log(userDoc)

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

                            setTimeout(() => {
                                props.reload(prev => !prev)
                            }, 500); // Adjust the delay as needed 
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
        </>
    )
}

export default CreateFolderModal