"use client"
import React, { FC, useEffect, useState } from "react";
import { DeleteIcon } from "../../../app/icons";
import { FolderIcon } from "../../../app/icons";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../../lib/firebase";
import Modal from "../../Modal";
import DeleteModal from "./DeleteModal";

interface Props {
    id: string
}

const ops: {jsx: React.ReactNode, color: string, weight: number, modal: ((id: string , state: boolean, updateState: React.Dispatch<React.SetStateAction<boolean[]>>, stateArr: boolean[], index: number) => React.ReactNode)}[] = [
    { "jsx": <>
         <DeleteIcon />
         <p>
             Delete
         </p>
     </>,
     "color": "red",
     "weight": 500,
     "modal": (
        id: string, 
        state: boolean, 
        updateState: React.Dispatch<React.SetStateAction<boolean[]>>, 
        stateArr: boolean[],
        index: number) => {
        console.log(state)
        return (
        <Modal state={state}>
            <DeleteModal updateState={updateState} state={stateArr} index={index} id={id} />
        </Modal>
     )}
     },
     { "jsx": <>
         <FolderIcon />
         <p>
             Add to folder
         </p>
     </>,
     "color": "emerald",
     "weight": 500,
     "modal": (
        id: string, 
        state: boolean, 
        updateState: React.Dispatch<React.SetStateAction<boolean[]>>, 
        stateArr: boolean[],
        index: number) => (
        <>
            <button
            onClick={(e) => {deleteDoc(doc(firestore, `/sets/${id}`))}} >
                Click
            </button>
        </>
     ),
    }
]


const SetOps: FC<Props> = (props: Props) => {

    const [modalsTrack, setModalsTrack] = useState<boolean[]>(new Array(ops.length).fill(false))

    useEffect(() => {console.log(modalsTrack)}, [modalsTrack])

    useEffect(() => console.log(props.id), [])
    return (
        <>
            <div className="bg-emerald-500"></div>
            <div className="flex gap-5" id="ops-container">
                {/* List of options, mapped into elements to avoid redundancy */}
                {
                ops.map((x, i) => 
                    {

                    return (
                    <>
                        <div 
                        key={i}
                        className={`
                        mt-2 ml-2
                        transition ease-in-out
                        hover:scale-110 hover:bg-${x.color}-${(x.weight + 200).toString()} hover:cursor-pointer
                        flex gap-2 px-4 py-2 rounded-lg bg-${x.color}-${x.weight.toString()} font-bold text-white`}
                        onClick={(e) => setModalsTrack(modalsTrack.map((y, u) => {
                            if (u === i) {
                                return y ? false : true
                            }

                            return y
                        }))}>
                            {/* Basic button JSX */}
                            {x.jsx}
                        </div>
                        {/* Pass through on/off state and the set id to modal  */}
                        {x.modal(props.id, modalsTrack[i], setModalsTrack, modalsTrack, i)}
                    </>
                )})
                }
            </div>
        </>
    )
}

export default SetOps