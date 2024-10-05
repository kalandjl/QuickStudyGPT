"use client"
import { FC, useState } from "react";
import { DeleteIcon } from "../../../app/icons";
import DeleteFolderModal from "./DeleteFolderModal";
import Modal from "../../Modal";

interface Props {
    folder: string
    uid: string
    index: number
    state: boolean[]
}

const FolderOps: FC<Props> = (props) => {

    let [modalActive, setModalActive] = useState<boolean>(false)

    return (
        <>
            <div id="dlt-btn-wrap" 
            className={`${props.state[props.index] ? "static" : "hidden"}
            h-full grid place-items-center hover:cursor-pointer`} 
            onClick={() => {
                
                setModalActive(true)
            }}>
                <DeleteIcon fill="#000000" />
            </div>
            {modalActive ? 
            <Modal state={modalActive}>
                <DeleteFolderModal 
                updateState={setModalActive}
                state={modalActive}
                folder={props.folder}
                uid={props.uid}
                /> 
            </Modal> 
            : 
            <></>
            }
        </>
    )
}

export default FolderOps