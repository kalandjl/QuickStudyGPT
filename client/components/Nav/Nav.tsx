"use client"
import Link from "next/link"
import { FC } from "react"
import NavAccountDiv from "./NavAccountDiv"
import Image from "next/image"
import logoPic from "../../public/logo.png"


interface Props {

}
const Nav: FC<Props> = (props: Props) => {

    const linksStyle = "text-slate-300 hover:cursor-pointer font-bold text-lg hover:underline"

    return (
        <>
            <nav
            id="navbar"
            className="px-48 h-16 bg-stone-950">
                <div id="content-flex" className="h-full flex justify-between">
                    <div id="logo-wrap" className="px-6 grid place-items-center h-full">
                        <Link href='/'>
                            <div id="logo" className="h-10 w-10 px-2 py-2 bg-teal-500 opacity-50 rounded-md">
                                <div id="logo-inner">
                                    <Image src={logoPic} 
                                    alt="logo"
                                    width={100} 
                                    height={10} />
                                </div>
                            </div>
                        </Link>
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
                        <Link href="/policies">
                            <p className={linksStyle}>
                                Policies
                            </p>
                        </Link>
                    </div>
                    <div id="account-wrap" className="grid place-items-center">
                        <NavAccountDiv /> 
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav