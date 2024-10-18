"use client"
import { FC, useState } from "react";
import { ArrowRightIcon } from "../../../app/icons"
import { updateDoc, doc, collection } from "firebase/firestore"
import { firestore } from "../../../lib/firebase"
import { CircularProgress } from "@chakra-ui/react"
 
interface Props {
    title: string
    id: string
}

const Title: FC<Props> = (props) => {

    let [title, setTitle] = useState(props.title)
    let [docTitle, setDocTitle] = useState(props.title)
    let [loading, setLoading] = useState<boolean>(false)

    return (
        <>
            <div className="relative">
                <input type="text"
                className="px-5 py-2 rounded-lg
                border-4 border-dashed
                text-6xl
                bg-transparent
                border-stone-400
                hover:border-stone-500 
                text-stone-400
                focus:border-blue-500 focus:border-opacity-80 focus:text-gray-700 focus:border-4 focus:border-solid"
                defaultValue={props.title} 
                onChange={e => setTitle(e.target.value)}/>
                {title === docTitle ? <></> :
                <div className="absolute right-0 top-0 grid place-items-center h-full mr-5">
                    {loading ? 
                    <>
                    <CircularProgress />
                    </>
                    :
                    <ArrowRightIcon fill="#000000" width="66" height="66" 
                    className="hover:bg-gray-100 rounded-md 
                    hover:cursor-pointer transition ease-in-out hover:scale-110"
                    onClick={async () => {
                        setLoading(true)

                        await updateDoc(doc(collection(firestore, "sets"), `/${props.id}`), {
                            title: title
                        })

                        setDocTitle(title)

                        setLoading(false)
                    }} />   
                    }
                </div>}
            </div>
        </>
    )
}

export default Title