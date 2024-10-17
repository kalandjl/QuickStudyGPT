"use client"

import { FC } from "react";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import Link from "next/link";
import { signOut } from "firebase/auth";
import { SignOutIcon } from "../../app/icons";

interface Props {

}

const NavAccountDiv:FC<Props> = (props: Props) => {

    let [ user, loading ] = useAuthState(auth)

    const linkStyle = "text-slate-300 font-bold hover:cusor-pointer"

    return (
        <>
            {
            loading ?
            <>
            Loading...
            </>
            :
            user ? 
            <>
                <button
                className="text-slate-300 text-xl font-extrabold hover:underline"
                onClick={(e) => {

                    e.preventDefault()

                    signOut(auth)
                }}>
                    <SignOutIcon color={"#d6d3d1"} aria-label="Sign Out"/>
                </button>
            </> 
            : 
            <>
                <div id="border-wrap" className="py-2 h-full">
                    <div className="flex flex-row gap-6 items-center h-full border-2 border-teal-500 px-6 rounded-lg">
                        <Link href="/log-in">
                            <p className={linkStyle}>
                                Log In
                            </p>
                        </Link>
                        <Link href="/sign-up">
                            <p className={linkStyle}>
                                Sign Up
                            </p>
                        </Link>
                    </div>               
                </div>
            </>
            }
        </>
    )
}

export default NavAccountDiv