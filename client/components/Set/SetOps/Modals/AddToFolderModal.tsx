"use client"
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { auth, firestore } from "../../../../lib/firebase";
import { usePathname, useRouter } from "next/navigation";
import { DeleteIcon } from "../../../../app/icons"
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
    updateState: React.Dispatch<React.SetStateAction<boolean[]>>
    state: boolean[]
    index: number
    id: string
}

const AddToFolderModal: FC<Props> = (props) => {


    const router = useRouter()
    const path = usePathname()
    let [folders, setFolders] = useState<string[]>([])
    let [foldersActive, setFoldersActive] = useState<boolean[]>([])
    let [initialFolder, setInitialFolder] = useState<string | undefined>(undefined)

    let [user] = useAuthState(auth)

    useEffect(() => {

        const doAsync = async () => {

            if (!user) return

            const t = JSON.parse((await getDoc(doc(firestore, `/users/${user.uid}`))).data()?.sets)

            if (!t) return

            setFolders(Object.keys(t))

            setFoldersActive(Object.keys(t).map((x: string) => {

                // If set id is in folder
                if (t[x].includes(props.id)) {

                    setInitialFolder(x)
                    return true
                }

                // If not
                return false
            }))
        }

        doAsync()
    }, [user])

    useEffect(() => console.log(initialFolder === folders[foldersActive.indexOf(true)]), [initialFolder])

    return (
        <>
            <div className="px-20">
                <div>
                    <div className="mt-2 text-center">
                        <h3 className="text-lg font-medium leading-6 text-stone-400 capitalize dark:text-white" id="modal-title">Add to Folder</h3>
                        <div id="folder-select-container" className="flex gap-3 justify-evenly w-auto mt-5">
                            {folders.map((folder, i) => (
                                <div key={i}>
                                        <button className={`px-3 py-1 transition ease-in-out rounded-md font-bold
                                        ${foldersActive[i] ? "bg-stone-500" : "bg-stone-300"}`}
                                        onClick={() => {
                                            setFoldersActive(foldersActive.map((y, u) => {
                                                if (u === i) {
                                                    return y ? false : true
                                                }
                                                
                                                return false
                                            }))
                                        }}>
                                            {folder === "default" ? "no folder" : folder}
                                        </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid place-items-center">
                    <div className="flex justify-between gap-10">
                        <button 
                        onClick={() => {

                            const newState = [...props.state];
                            newState[props.index] = false; // Set the current modal state to false (close)
                            props.updateState(newState);
                        }}
                        className="hover:cursor-pointer w-full px-4 py-2 mt-2 text-sm
                    tracking-wide capitalize transition-colors duration-300 rounded-md sm:mt-0 sm:w-auto sm:mx-2 
                    hover:bg-stone-400 focus:outline-none focus:ring focus:ring-gray-300 
                    focus:ring-opacity-40 bg-stone-300 font-bold">
                            Cancel
                        </button>

                        <button 
                        onClick={async (e) => {
                            
                            const runUpdate = async () => {

                                if (!user) return 

                                let selectedFolder = folders[foldersActive.indexOf(true)]

                                if (selectedFolder === initialFolder) return 
                                    

                                const sets = JSON.parse((await getDoc(doc(firestore, `/users/${user.uid}`))).data()?.sets ?? {})
                                
                                if (!sets) return 


                                if (sets.hasOwnProperty(selectedFolder)) {

                                    if (sets[selectedFolder].some((str: string) => str.includes(props.id))) return
                                        // Iterate through the folders to find and remove the set ID
                                        for (const folder in sets) {
                                            const index = sets[folder].indexOf(props.id);
                                            if (index > -1) {
                                                sets[folder].splice(index, 1); // Remove the set ID from the folder
                                                break; // Exit loop after finding and removing the set ID
                                            }
                                        }

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
                                await runUpdate()
                            } catch (e) {
                                console.error(e)
                            }
                            
                            const newState = [...props.state];
                            newState[props.index] = false; // Set the current modal state to false (close)
                            props.updateState(newState);

                            setTimeout(() => {
                                window.location.reload();
                            }, 500); 

                        }}
                        className={`hover:cursor-pointer w-full px-4 py-2 mt-2 text-sm tracking-wide 
                        text-white capitalize transition-colors duration-300 transform rounded-md 
                        sm:w-auto sm:mt-0 focus:outline-none focus:ring focus:ring-red-400 
                        focus:ring-opacity-40 font-bold 
                        ${initialFolder === folders[foldersActive.indexOf(true)] ? "bg-purple-300 hover:cursor-not-allowed"  : "bg-purple-600"
                        }`}>
                            {initialFolder === folders[foldersActive.indexOf(true)]}
                            Add
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddToFolderModal