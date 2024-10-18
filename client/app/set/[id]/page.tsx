"use client"
import { doc, getDoc } from "firebase/firestore"
import { GetServerSideProps, NextPage } from "next"
import { notFound, useParams } from "next/navigation"
import { firestore } from "../../../lib/firebase"
import { EditIcon } from "../../icons"
import { useEffect, useState } from "react"
import Title from "../../../components/Set/Title"
import Questions from "../../../components/Set/Questions"
import SetOps from "../../../components/Set/SetOps"
import QuestionsOps from "../../../components/Set/Questions/QuestionsOps/QuestionsOps"
import Set from "../../../components/Set"


const Home: NextPage<{params: any}> = ({ params }) => {

    let [reload, setReload] = useState(false)

    // Set id
    const id = params.id

    return (
        <>
            <Set reload={setReload} id={id} state={reload} key={reload.toString()} />
        </>
    )
}

export default Home