"use client"
import { FC, useState } from "react";
import { DeleteIcon, EditIcon } from "../../../app/icons";
import DeleteFolderModal from "./DeleteFolderModal";
import Modal from "../../Modal";
import { auth } from "../../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import RenameFolderModal from "./RenameFolderModal";

interface Props {
    folder: string
    uid: string
    index: number
    state: boolean[]
}

const ops: {jsx: React.ReactNode, modal: ((folder: string, uid: string, state: boolean, updateState: React.Dispatch<React.SetStateAction<boolean[]>>, stateArr: boolean[], index: number) => React.ReactNode)}[] = [
    { "jsx": <>
        <EditIcon fill="#000000" />
     </>,
     "modal": (
        folder: string,
        uid: string,
        state: boolean, 
        updateState: React.Dispatch<React.SetStateAction<boolean[]>>, 
        stateArr: boolean[],
        index: number) => {
        return (
        <Modal state={state}>
            <RenameFolderModal updateState={updateState} state={stateArr} index={index} folder={folder} uid={uid} />
        </Modal>
     )}
    },
    { "jsx": <>
        <DeleteIcon fill="#000000" />
     </>,
     "modal": (
        folder: string,
        uid: string,
        state: boolean, 
        updateState: React.Dispatch<React.SetStateAction<boolean[]>>, 
        stateArr: boolean[],
        index: number) => {
        return (
        <Modal state={state}>
            <DeleteFolderModal updateState={updateState} state={stateArr} index={index} folder={folder} uid={uid} />
        </Modal>
     )}
    },
]

const FolderOps: FC<Props> = (props) => {

    const [modalsTrack, setModalsTrack] = useState<boolean[]>(new Array(ops.length).fill(false))
    let [user] = useAuthState(auth)

    return (
        <>
            <div id="folder-ops-wrap" 
            className={`${props.state[props.index] ? "static" : ""}
            h-full flex place-items-center hover:cursor-pointer`} 
            onClick={() => {}}>
                {/* <DeleteIcon fill="#000000" /> */}
                {/* List of options, mapped into elements to avoid redundancy */}
                {props.folder && user ?
                ops.map((x, i) => 
                    {
                    return (
                    <div key={i}>
                        <div 
                        className={`
                        transition ease-in-out
                        hover:scale-110 hover:cursor-pointer
                        flex gap-2 px-2 py-2 rounded-lg font-bold text-white`}
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
                        {x.modal(props.folder, user.uid, modalsTrack[i], setModalsTrack, modalsTrack, i)}
                    </div>
                )}) : <>
                </>
                }
            </div>
        </>
    )
}

export default FolderOps