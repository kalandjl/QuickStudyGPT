"use client"
import { FC } from "react"
import { auth, firestore } from "../../lib/firebase"
import { getDoc, doc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Props {

}

const SideBar: FC<Props> = (props) => {

    const [user] = useAuthState(auth)
    let [docs, setDocs] = useState<any>([])

    useEffect(() => {

        if (!user) return
        const f = async () => {

            const sets = (await getDoc(doc(firestore, `/users/${user.uid}`)))?.data()?.sets
            const dbDocs = await Promise.all(
                sets.map(async (set: any) => {
                    let ref = (await getDoc(doc(firestore, `/sets/${set}`)))

                    return {
                        ...ref.data(),
                        id: ref.id
                    }
                })
            )

            console.log(sets, dbDocs)
            setDocs(dbDocs)
        }
        f()
    }, [user])

    return (
        <>
            <div className="h-full w-full overflow-scroll bg-gray-100 grid grid-flow-col gap-2">

                {docs.map((doc: any) => (
                    <Link href={`/set/${doc.id}`}>
                        {doc.title}
                    </Link>
                ))}
            </div>
        </>
    )
}

export default SideBar