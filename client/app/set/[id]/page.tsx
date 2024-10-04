import { doc, getDoc } from "firebase/firestore"
import { GetServerSideProps, NextPage } from "next"
import { notFound, useParams } from "next/navigation"
import { firestore } from "../../../lib/firebase"
import { EditIcon } from "../../icons"
import { useState } from "react"
import Title from "../../../components/Set/Title"
import Questions from "../../../components/Set/Questions"
import SetOps from "../../../components/Set/SetOps"


const Home: NextPage<{params: any}> = async ({ params }) => {


    // Set id
    const id = params.id

    // Fetch set
    const set = (await getDoc(doc(firestore, `${`/sets/${id}`}`))).data()

    if (!set) {
        // Show a 404 page if the set is not found
        notFound();
    }

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
                                    <Title title={set.title} /> 
                                </div>
                            </span>
                        </h1>
                        <div className="mt-10">
                            <SetOps id={id} />
                        </div>
                    </div>
                </section>
                <section className="col-span-8" 
                id="questions-sect">
                    <Questions content={set.content} />
                </section>
            </main> 
        </>
    )
}

export default Home