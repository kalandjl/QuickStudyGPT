"use client"
import { FC, useState } from "react";
import { generateGPT } from "../../../../lib/gpt";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../lib/firebase";
import Loading from "../../../Loading";

interface Props {
    notes: string
    id: string
    prev: {[x: string]: {question: string, answer: string}}
}

const QuestionsOps: FC<Props> = (props) => {

    let [user] = useAuthState(auth)
    let [loading, setLoading] = useState(false)

    return (
        <>
            {loading ? <Loading loading={loading} /> : <></>}
            <div id="questions-ops" className="flex justify-start py-5">
                <div id="gen-btn">
                    <button className="transition ease-in-out px-6 py-4 rounded-md bg-green-400 hover:bg-green-500
                    text-xl font-bold hover:scale-105"
                    onClick={async (e) => {

                        setLoading(true)

                        await generateGPT(props.notes, props.id)

                        setLoading(false)

                    }}>
                        Generate more questions
                    </button>
                </div>
            </div>
        </>
    )
}

export default QuestionsOps