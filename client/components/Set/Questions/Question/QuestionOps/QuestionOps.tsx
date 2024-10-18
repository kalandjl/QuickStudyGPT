"use client"
import { FC, useState } from "react";
import { DeleteIcon } from "../../../../../app/icons";
import DeleteQuestionModal from "./Modals/DeleteQuestionModal";
import Modal from "../../../../Modal";

interface Props {
    id: string
    question: string
    reload: React.Dispatch<React.SetStateAction<boolean>>
}

interface ModalProps {
    id: string, 
    question: string
    state: boolean, 
    updateState: React.Dispatch<React.SetStateAction<boolean[]>>, 
    stateArr: boolean[], 
    index: number,
    reload: React.Dispatch<React.SetStateAction<boolean>>
}

const ops: {
    jsx: React.ReactNode, modal: (props: ModalProps) => React.ReactNode}[] = [
    { "jsx": <>
        <DeleteIcon fill="#d10015" />
     </>,
     "modal": (props) => {
        return (
        <Modal state={props.state}>
            <DeleteQuestionModal 
            updateState={props.updateState} 
            state={props.stateArr} 
            index={props.index} 
            id={props.id}
            question={props.question} 
            reload={props.reload} />
        </Modal>
     )}
    },
]


const QuestionOps: FC<Props> = (props) => {

    const [modalsTrack, setModalsTrack] = useState<boolean[]>(new Array(ops.length).fill(false))

    return (
        <>
            <div id="folder-ops-wrap" 
            className={`
            h-full flex place-items-center hover:cursor-pointer`} 
            onClick={() => {}}>
                {/* <DeleteIcon fill="#000000" /> */}
                {/* List of options, mapped into elements to avoid redundancy */}
                {props.id && props.question ?
                ops.map((x, i) => 
                    {
                    return (
                    <div key={i}>
                        <div 
                        className={`
                        grid place-items-center
                        transition ease-in-out
                        hover:scale-110 hover:cursor-pointer
                        gap-2 pl-4 rounded-lg font-bold text-white`}
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
                        {x.modal({
                            id: props.id, 
                            question: props.question, 
                            updateState: setModalsTrack,
                            state: modalsTrack[i], 
                            stateArr: modalsTrack, 
                            index: i,
                            reload: props.reload
                        })}
                    </div>
                )}) : <>
                </>
                }
            </div>
        </>
    )
}

export default QuestionOps