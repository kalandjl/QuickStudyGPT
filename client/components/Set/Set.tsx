"use client"
import { doc, getDoc } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { firestore } from "../../lib/firebase";
import { notFound } from "next/navigation";
import Title from "./Title";
import SetOps from "./SetOps";
import Questions from "./Questions";

interface Props {
    id: string
    reload: React.Dispatch<React.SetStateAction<boolean>>
    state: boolean
}

const Set: FC<Props> = (props) => {

    const [set, setSet] = useState<{[x: string]: any}>()
    const [loading, setLoading] = useState(true);

    useEffect(() => {


        const fetchData = async () => {
        try {
            console.log(props.id)
            const set = (await getDoc(doc(firestore, `${`/sets/${props.id}`}`))).data()
            
            if (!set) return

            setSet(set)
            setLoading(false) // Set loading to false after the documents have been fetched
        } catch (error) {
            setLoading(false)
        }
        }

        fetchData()
    }, [props.state])

    if (!set) return(<></>)

    return (
        <>
            <main
            className="grid grid-flow-row grid-cols-8 pt-24">
                <section className="flex flex-1 col-span-6 col-start-2"
                id="heading-sect">
                    <div className="flex flex-col w-full ">
                        <h1 className="text-6xl font-bold">
                            <span className="text-gray-800 grid place-items-center w-1/3">
                                <div className="grid grid-flow-col gap-5">
                                    <Title title={set.title} id={props.id} /> 
                                </div>
                            </span>
                        </h1>
                        <div className="mt-10">
                            <SetOps id={props.id} />
                        </div>
                    </div>
                </section>
                <section className="col-span-8" 
                id="questions-sect">
                    <Questions content={set.content} id={props.id} notes={set.notes} reload={props.reload} />
                </section>
            </main> 
        </>
    )
}

export default Set