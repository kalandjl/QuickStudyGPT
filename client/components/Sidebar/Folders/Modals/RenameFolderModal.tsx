import { FC, useState } from "react";
import { DeleteIcon } from "../../../../app/icons";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../../lib/firebase";

interface Props {
    updateState: React.Dispatch<React.SetStateAction<boolean[]>>
    state: boolean[]
    folder: string
    uid: string
    index: number
    reload: React.Dispatch<React.SetStateAction<boolean>>
}

const RenameFolderModal: FC<Props> = (props) => {

    let router = useRouter()
    let [newFolder, setNewFolder] = useState<string>("")

    return (
        <>
            <div className="px-10">
                <div>
                    <div className="mt-2 text-center">
                        <h3 className="text-lg font-medium leading-6 text-stone-400 capitalize dark:text-white" id="modal-title">Rename Folder</h3>
                        <div id="input-wrap" className="w-64 mt-6 mb-10">
                            <input
                            placeholder="New Folder Name"
                            className="mt-2 text-sm text-gray-500 dark:text-gray-400 w-full rounded-md
                            px-2 py-1 ring-2 ring-stone-600 bg-transparent
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
                        tracking-wide capitalize transition-colors duration-300 rounded-md sm:mt-0 sm:w-auto sm:mx-2 
                        hover:bg-stone-500 focus:outline-none focus:ring focus:ring-gray-300 
                        focus:ring-opacity-40 bg-stone-400">
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

                            setTimeout(() => {
                                props.reload(prev => !prev)
                            }, 500); // Adjust the delay as needed 
                        }}
                        className="hover:cursor-pointer w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide 
                        text-white capitalize transition-colors duration-300 transform bg-green-800 rounded-md 
                        sm:w-auto sm:mt-0 hover:bg-green-900 focus:outline-none focus:ring focus:ring-green-300 
                        focus:ring-opacity-40">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RenameFolderModal