"use client"
import Link from "next/link"
import { FC } from "react"


interface Props {

}
const Nav: FC<Props> = (props: Props) => {

    return (
        <>
            <nav
            id="navbar"
            className="h-20 bg-slate-700 mx-10 my-2 rounded-lg px-16">
                <div id="content-flex" className="flex flex-row h-full place-content-between items-center">
                    <div id="links" className="flex flex-row items-center gap-6">
                        <Link href="/">
                            <p className="text-white font-bold text-lg">
                                Home
                            </p>
                        </Link>
                        <Link href="/about">
                            <p className="text-white font-bold text-lg">
                                About
                            </p>
                        </Link>
                        <Link href="/sets">
                            <p className="text-white font-bold text-lg">
                                Sets
                            </p>
                        </Link>
                    </div>
                    <div id="account">
                        <p className="text-lg text-white font-bold hover:underline hover:cursor-pointer underline-offset-1">Account</p>
                    </div>
                </div>

            </nav>
        </>
    )
}

export default Nav