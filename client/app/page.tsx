"use client"
import { FormEvent, useRef } from "react"
import { getGPT } from "../lib/gpt"

const Home = () => {

    let notes = useRef(null)

    const doForm = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        //@ts-ignore
        const res = await getGPT(e.currentTarget.children[0].children[0].value)

        console.log(res)
    }

    return (
        <>
            <header
            id="header"
            className="bg-lime-200 pl-40 py-10 ">
                <div  
                id="heading-wrap"
                className="">
                    <h1 
                    id="heading"
                    className="text-4xl text-blue-400 font-semibold">
                        Quick Study GPT
                    </h1>
                </div>
            </header>
            <main 
            id="main-division"
            className="h-screen px-40 py-5 bg-green-50">
                <form 
                id="notes-form"
                onSubmit={(e) => doForm(e)}>
                    <div 
                    id="notes-input-wrap w-full h-64">
                        <input 
                        ref={notes}
                        type="text" 
                        name="Notes" 
                        id="note-input" 
                        placeholder="Enter Notes Here"
                        className="w-full h-64 border-2 focus-visible:border-blue-400" />
                    </div>
                    <div id="buffer" className="h-10"></div>
                    <button
                    id="form-submit-btn"
                    type="submit"
                    className="border-2 hover:border-blue-400 rounded-lg px-4 py-2 mr-6 bg-white">
                        Submit Notes!
                    </button>
                </form>
            </main>
        </>
    )
}

export default Home