"use client"
import { FC, useState } from "react";
import { ArrowRightIcon } from "../../../app/icons"
import { updateDoc, doc, collection } from "firebase/firestore"
import { firestore } from "../../../lib/firebase"
import { CircularProgress } from "@chakra-ui/react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../../lib/firebase"
 
interface Props {
    title: string
    id: string
    uid: string
}

const Title: FC<Props> = (props) => {

    let [title, setTitle] = useState(props.title)
    let [docTitle, setDocTitle] = useState(props.title)
    let [loading, setLoading] = useState<boolean>(false)
    let [user] = useAuthState(auth)
    let [owned, setOwned] = useState<boolean>(props.uid === user?.uid)
    

    return (
        <>
            <div className="relative">
                {owned ? 
                <>
                    <input type="text"
                    className="px-5 py-2 rounded-lg
                    border-4 border-dashed
                    text-6xl
                    bg-transparent
                    border-stone-600
                    hover:border-stone-700 
                    text-stone-100
                    focus:border-blue-500 focus:border-opacity-80 focus:text-gray-400 focus:border-4 focus:border-solid"
                    defaultValue={props.title} 
                    onChange={e => setTitle(e.target.value)}/>
                    {title === docTitle ? <></> :
                    <div className="absolute right-0 top-0 grid place-items-center h-full mr-5">
                        {loading ? 
                        <>
                        <CircularProgress />
                        </>
                        :
                        <ArrowRightIcon fill="#9c9c9c" width="66" height="66" 
                        className="hover:bg-stone-800 rounded-md 
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
                </>
                : 
                <>
                <div
                className="px-5 py-2 rounded-lg w-full
                border-4
                text-6xl
                bg-transparent
                border-stone-500
                text-stone-200"
                defaultValue={props.title}>
                        {props.title}
                </div>
                </>
                }   
            </div>
        </>
    )
}

export default Title