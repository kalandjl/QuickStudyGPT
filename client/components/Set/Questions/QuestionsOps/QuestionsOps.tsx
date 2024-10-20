"use client"
import { FC, useState } from "react";
import { generateGPT } from "../../../../lib/gpt";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../lib/firebase";
import Loading from "../../../Loading";
import useAuth from "../../../../utils/useAuth";

interface Props {
    notes: string
    id: string
    prev: {[x: string]: {question: string, answer: string}}
}

const QuestionsOps: FC<Props> = (props) => {

    let [user] = useAuth(window.localStorage.getItem("accessToken"))
    let [loading, setLoading] = useState<boolean>(false)
    

    return (
        <>
            {loading ? <Loading loading={loading} /> : <></>}
            <div id="questions-ops" className="flex justify-start py-5 my-10">
                <div id="gen-btn">
                    <button className="transition ease-in-out px-6 py-4 rounded-md bg-green-800 hover:bg-green-900 text-stone-300
                    text-xl font-bold hover:scale-105"
                    onClick={async (e) => {

                        setLoading(true)

                        await generateGPT(props.notes, props.id)

                        setLoading(false)

                        setTimeout(() => window.location.reload(), 1000)
                    }}>
                        Generate more questions
                    </button>
                </div>
            </div>
        </>
    )
}

export default QuestionsOps