"use client"

import { FC } from "react";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import Link from "next/link";
import { signOut } from "firebase/auth";

interface Props {

}

const NavAccountDiv:FC<Props> = (props: Props) => {

    let [ user, loading ] = useAuthState(auth)

    const linkStyle = "text-black text-lg font-bold hover:cusor-pointer"

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
                className="text-black text-xl font-extrabold"
                onClick={(e) => {

                    e.preventDefault()

                    signOut(auth)
                }}>
                    Sign out
                </button>
            </> 
            : 
            <>
                <div className="flex flex-row gap-6 items-center h-full border-2 border-teal-500 px-10 rounded-lg mt-3">
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
            </>
            }
        </>
    )
}

export default NavAccountDiv