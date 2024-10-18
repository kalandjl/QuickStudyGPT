"use client"
import { FC, useEffect } from "react"

interface Props {
    children: React.ReactNode
    state: boolean
    unique?: boolean
}

const Modal: FC<Props> = (props) => {

    return (
        <>
            <div 
            style={{backgroundColor: "rgba(0 0 0 / 0.3)"}}
            className={`top-0 bottom-0 left-0 right-0 grid place-items-center z-10 cursor-default
            ${props.state ? "fixed" : "hidden"}`}>
                {props.unique ? 
                props.children :
                <div className="z-50">
                    <div className="flex items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom  
                        transition-all transform rounded-lg rtl:text-right dark:bg-gray-900  
                        sm:my-8 sm:align-middle sm:w-full sm:p-6 bg-stone-900 shadow-inner shadow-zinc-700">
                            {props.children}
                        </div>
                    </div>
                </div>
                }
            </div>
        </>
    )
}

export default Modal