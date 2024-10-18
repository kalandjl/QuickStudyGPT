"use client"
import { FC } from "react";
import { DeleteIcon } from "../../../../../../app/icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../../../../lib/firebase";

interface Props {
    updateState: React.Dispatch<React.SetStateAction<boolean[]>>
    state: boolean[]
    id: string
    index: number
    reload: React.Dispatch<React.SetStateAction<boolean>>
    question: string // Question Index Number
}

const DeleteQuestionModal: FC<Props> = (props) => {

    return (
        <>
            <div>
                <div className="flex items-center justify-center">
                    <DeleteIcon fill="#9c9c9c" />
                </div>

                <div className="mt-2 text-center">
                    <h3 className="text-lg font-medium leading-6 text-stone-400 capitalize dark:text-white" id="modal-title">Delete Question</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this question? Once deleted, it's data is errased and cannot be retrieved
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
                    tracking-wide capitalize transition-colors duration-300 rounded-md sm:mt-0 sm:w-auto sm:mx-2 
                    hover:bg-stone-400 focus:outline-none focus:ring focus:ring-gray-300 
                    focus:ring-opacity-40 bg-stone-300">
                        Cancel
                    </button>

                    <button 
                    onClick={async (e) => {

                        try {
                            
                            const id = props.id 
                            const question = props.question

                            const content: {[x: string]: any} = (await getDoc(doc(firestore, `/sets/${id}`))).data()?.content

                            if (!content) return alert("no set content (wrong set id?)")

                            let updatedContent = {}

                            // Filtered object without deleted question
                            Object.keys(content).forEach((x, i) => {

                                if (x === question) return

                                updatedContent = {
                                    ...updatedContent,
                                    [x]: content[x]
                                }
                            })

                            Object.keys(updatedContent).forEach((x, i) => updatedContent = {
                                ...updatedContent,
                                // @ts-ignore
                                [i.toString()]: updatedContent[x]
                            })

                            await updateDoc(doc(firestore, `/sets/${id}`), {
                                content: {...updatedContent}
                            })
                        } catch (e) {

                            return console.error(e)
                        }

                        const newState = [...props.state];
                        newState[props.index] = false; // Set the current modal state to false (close)
                        props.updateState(newState);

                        setTimeout(() => {
                            props.reload(prev => !prev)
                        }, 1500); // Adjust the delay as needed 
                    }}
                    className="hover:cursor-pointer w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide 
                    text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md 
                    sm:w-auto sm:mt-0 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 
                    focus:ring-opacity-40">
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeleteQuestionModal