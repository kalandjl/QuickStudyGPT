"use client"
import { FC, useEffect } from "react"

interface Props {
    children: React.ReactNode
    state: boolean
}

const Modal: FC<Props> = (props) => {

    useEffect(() => {
        console.log("Modal state:", props.state);
      }, [props.state]);

    return (
        <>
            <div 
            style={{backgroundColor: "rgba(0 0 0 / 0.3)"}}
            className={`top-0 bottom-0 left-0 right-0 grid place-items-center z-10
            ${props.state ? "fixed" : "hidden"}`}>
                {props.children}
            </div>
        </>
    )
}

export default Modal