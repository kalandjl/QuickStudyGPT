"use client"
import Link from "next/link"
import { FC } from "react"
import NavAccountDiv from "./NavAccountDiv"


interface Props {

}
const Nav: FC<Props> = (props: Props) => {

    const linksStyle = "text-black hover:cursor-pointer font-bold text-lg"

    return (
        <>
            <nav
            id="navbar"
            className="px-48 h-16 bg-gray-300">
                <div id="content-flex" className="h-full flex justify-between">
                    <div id="logo-wrap" className="px-6 grid place-items-center h-full">
                        <div id="logo" className="h-10 w-10 bg-teal-500 opacity-50"></div>
                    </div>
                    <div id="links-wrap" className="h-full flex flex-row items-center gap-20 pr-20">
                        <Link href="/">
                            <p className={linksStyle}>
                                Home
                            </p>
                        </Link>
                        <Link href="/about">
                            <p className={linksStyle}>
                                About
                            </p>
                        </Link>
                        <Link href="/contact">
                            <p className={linksStyle}>
                                Contact
                            </p>
                        </Link>
                        <Link href="/policies">
                            <p className={linksStyle}>
                                Policies
                            </p>
                        </Link>
                    </div>
                    <div id="account-wrap">
                        <NavAccountDiv /> 
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav