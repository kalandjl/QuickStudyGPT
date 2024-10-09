import { FC } from "react";
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

const DeleteFolderModal: FC<Props> = (props) => {

    let router = useRouter()

    return (
        <>
            <div className="z-50">
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                        <div>
                            <div className="flex items-center justify-center">
                                <DeleteIcon fill="#585959" />
                            </div>

                            <div className="mt-2 text-center">
                                <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">Delete Set</h3>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this folder? Once deleted, it's data is errased and cannot be retrieved
                                </p>
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
                                       
                                        await updateDoc(doc(firestore, `/users/${props.uid}`), {
                                            "sets": JSON.stringify({...Object.fromEntries(
                                                Object.entries(sets).filter(([key]) => key !== props.folder),
                                            )})
                                        })
                                    } catch (e) {

                                        return console.error(e)
                                    }

                                    const newState = [...props.state];
                                    newState[props.index] = false; // Set the current modal state to false (close)
                                    props.updateState(newState);

                                    setTimeout(() => {
                                        props.reload(prev => !prev)
                                    }, 200); // Adjust the delay as needed 
                                }}
                                className="hover:cursor-pointer w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide 
                                text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md 
                                sm:w-auto sm:mt-0 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 
                                focus:ring-opacity-40">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteFolderModal