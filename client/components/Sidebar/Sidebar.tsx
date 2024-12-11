"use client";
import { FC, useEffect, useState } from "react";
import { auth, firestore } from "../../lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Folders from "./Folders";
import Ops from "./Ops";

interface Props {}

const SideBar: FC<Props> = () => {

    let [reload, setReload] = useState(true)
    let [user] = useAuthState(auth)

    return (
        <div className="h-full w-full bg-stone-800 px-2 py-4">
            {user 
            ? 
            <></>
            :
            <p className="text-stone-200 w-full grid place-items-center">
                Sign in to start creating sets
            </p>
            }
            {user ? <Ops uid={user?.uid} reload={setReload} /> : <></>}
            <div className="w-full my-3 bg-gray-400" style={{height: "3px"}}></div>
            {user ? <Folders key={reload.toString()} reload={setReload} /> : <></>}
        </div>
    )
}

export default SideBar
