"use client"
import React, { FC, useEffect, useState } from "react";
import { CircleAddIcon, DeleteIcon } from "../../../app/icons";
import { FolderIcon } from "../../../app/icons";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../../../lib/firebase";
import Modal from "../../Modal";
import NewFolderModal from "./NewFolderModal";
import { useAuthState } from "react-firebase-hooks/auth";


interface Props {
    uid: string
}

const ops: {jsx: React.ReactNode, modal: ((uid: string, state: boolean, updateState: React.Dispatch<React.SetStateAction<boolean[]>>, stateArr: boolean[], index: number) => React.ReactNode)}[] = [
    { "jsx": <>
        <CircleAddIcon fill="#000000" />
     </>,
     "modal": (
        uid: string,
        state: boolean, 
        updateState: React.Dispatch<React.SetStateAction<boolean[]>>, 
        stateArr: boolean[],
        index: number) => {
        return (
        <Modal state={state}>
            <NewFolderModal updateState={updateState} state={stateArr} index={index} uid={uid} />
        </Modal>
     )}
    },
]


const SetOps: FC<Props> = (props: Props) => {

    const [modalsTrack, setModalsTrack] = useState<boolean[]>(new Array(ops.length).fill(false))
    let [user] = useAuthState(auth)

    return (
        <>
            <div className="bg-emerald-500"></div>
            <div className="flex gap-5" id="ops-container">
                {/* List of options, mapped into elements to avoid redundancy */}
                {user ?
                ops.map((x, i) => 
                    {
                    return (
                    <div key={i}>
                        <div 
                        className={`
                        mt-2 ml-2
                        transition ease-in-out
                        hover:scale-110hover:cursor-pointer
                        flex gap-2 px-4 py-2 rounded-lg font-bold text-white`}
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
                        {x.modal(user.uid, modalsTrack[i], setModalsTrack, modalsTrack, i)}
                    </div>
                )}) : <>
                </>
                }
            </div>
        </>
    )
}

export default SetOps