"use client"

import { FC } from "react";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import Link from "next/link";
import { SignOutIcon } from "../../app/icons";
import useAuth from "../../utils/useAuth";
import { signOut } from "../../lib/auth/index";

interface Props {

}

const NavAccountDiv:FC<Props> = (props: Props) => {

    let [ user, loading ] = useAuth(typeof window !== "undefined" 
        ? window.localStorage.getItem("accessToken") : null)

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
            <div id="nav-account" className="flex gap-2">
                <p id="display-name" className="text-stone-300 font-semibold">
                    {user.name}
                </p>
                <button
                className="text-slate-300 text-xl font-extrabold hover:underline"
                onClick={(e) => {

                    e.preventDefault()

                    signOut(window)
                }}>
                    <SignOutIcon 
                    color={"#d6d3d1"} 
                    aria-label="Sign Out"
                    className="transition ease-in-out hover:scale-110"
                    />
                </button>
            </div> 
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