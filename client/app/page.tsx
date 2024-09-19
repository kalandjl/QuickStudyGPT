"use client"
import { FormEvent, useRef, useState } from "react"
import { getGPT } from "../lib/gpt"
import { Button, Card, CardBody, Heading, Stack, Textarea } from "@chakra-ui/react"
import { NotesIcon, QuizIcon } from "./icons"

const Home = () => {

    let [questions, setQuestions] = useState([])

    const doForm = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        //@ts-ignore
        const res = await getGPT(e.currentTarget.children[0].value)

        const mes = res.message.content


        try {

            let questionsArr = JSON.parse(mes)

            setQuestions(questionsArr)

        } catch(e) {

            alert(`Couldn't parse response: ${e}`)
        }
    }

    return (
        <>
            <header
            id="header"
            className="px-40 py-10 bg-white">
                <div  
                id="heading-wrap"
                className="grid place-items-center w-full">
                    <Heading 
                    id="heading"
                    className="text-7xl text-slate-700 font-extrabold"
                    >
                    Quick Study GPT
                    </Heading>
                    <Heading as='h2' size='2xl'
                    className="text-teal-500 mt-10 font-semibold">
                        Enter your notes below
                    </Heading>
                    
                </div>
            </header>
            <main 
            id="main-division"
            className="h-screen px-40 py-5 bg-white">
                <form 
                id="notes-form"
                onSubmit={(e) => doForm(e)}>
                    <Textarea
                    size="lg"
                    placeholder='Here is a sample placeholder'
                    className="font-slate-600" />
                    <div 
                    id="button-stack-wrap"
                    className="grid place-items-center py-10">
                        <Stack direction='row' spacing={4}>
                            <Button type="submit" leftIcon={<QuizIcon />} colorScheme='teal' variant='solid'>
                                Notes
                            </Button>
                            <Button type="submit" rightIcon={<NotesIcon />} colorScheme='teal' variant='outline'>
                                Summarize
                            </Button>
                        </Stack>
                    </div>
                </form>
                {questions.map((question, i) => 
                    <>
                        <p 
                        key={i}
                        className="text-black">
                            {`${i}. ${question}`}
                        </p>
                    </>
                )}
            </main>
        </>
    )
}

export default Home