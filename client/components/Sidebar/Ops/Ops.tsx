"use client"
import React, { FC, useEffect, useState } from "react";
import { CircleAddIcon, CreateFolderIcon, DeleteIcon } from "../../../app/icons";
import { FolderIcon } from "../../../app/icons";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../../../lib/firebase";
import Modal from "../../Modal";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateFolderModal from "./Modals/CreateFolderModal";
import useAuth from "../../../utils/useAuth";


interface Props {
    uid: string
    reload: React.Dispatch<React.SetStateAction<boolean>>
}

const ops: {jsx: React.ReactNode, modal: ((
    uid: string, 
    state: boolean, 
    updateState: React.Dispatch<React.SetStateAction<boolean[]>>, 
    stateArr: boolean[], 
    index: number,
    reload: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode)}[] = [
    { "jsx": <>
        <CreateFolderIcon fill="#d6d3d1" />
     </>,
     "modal": (
        uid: string,
        state: boolean, 
        updateState: React.Dispatch<React.SetStateAction<boolean[]>>, 
        stateArr: boolean[],
        index: number,
        reload: React.Dispatch<React.SetStateAction<boolean>>) => {
        return (
        <Modal state={state}>
            <CreateFolderModal updateState={updateState} state={stateArr} index={index} uid={uid} reload={reload} />
        </Modal>
     )}
    },
]


const SetOps: FC<Props> = (props: Props) => {

    const [modalsTrack, setModalsTrack] = useState<boolean[]>(new Array(ops.length).fill(false))
    let [user] = useAuth(window.localStorage.getItem("accessToken"))

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
                        transition ease-in-out
                        hover:scale-110 hover:cursor-pointer hover:bg-stone-700
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
                        {x.modal(
                            user.uid, // UID
                            modalsTrack[i], // Initial state
                            setModalsTrack, // State dispatch function
                            modalsTrack, // State
                            i, // Index to set modal's visibility
                            props.reload // Reload function to auto-update
                            )}
                    </div>
                )}) : <>
                </>
                }
            </div>
        </>
    )
}

export default SetOps