"use client"
import { FormEvent, useRef, useState } from "react"
import { getCorrections, getGPT } from "../lib/gpt"
import { Button, FormLabel, Heading, Input, Spinner, Stack, Textarea, FormControl } from "@chakra-ui/react"
import { NotesIcon, QuizIcon } from "./icons"

const Home = () => {

    let [notes, setNotes] = useState(``)
    let [questions, setQuestions] = useState(["What are the three main types of bonds in chemistry and how do they differ?","Explain the significance of positive and negative dipoles in molecular structures.","List and explain six characteristics of water that are important for organisms.","How do acids and bases differ in terms of pH and chemical properties? What is the role of buffers in this context?","How can you determine if a molecular structure is organic or inorganic?","Why is carbon considered an essential component of biochemicals?","Provide examples to illustrate the involvement of water in hydrolysis and synthesis reactions.","Identify a variety of monomers and explain how they combine to form larger molecules.","Describe the structures, key features, and uses of carbohydrates, lipids, proteins, and nucleic acids.","What is the role of ATP in biological systems as an 'energy currency'?"])
    let [answers, setAnswers] = useState<{[question: string]: {correct: boolean, critique: string, question: string}}>({})
    const [isLoading, setIsLoading] = useState(false);


    const notesForm = async (e: FormEvent<HTMLFormElement>) => {

        setIsLoading(true)

        e.preventDefault()

        //@ts-ignore
        const notes = e.currentTarget.children[0].value

        console.log(notes)

        const res = await getGPT(notes)

        setNotes(notes)

        const mes = res.message.content.replace("json", "")


        try {

            let questionsArr = JSON.parse(mes)


            setQuestions(questionsArr)

        } catch(e) {

            alert(`Couldn't parse response: ${e}`)
        }

        setIsLoading(false)
    }

    const answersForm = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        // @ts-ignore
        let answers: string[] = Array.prototype.slice.call(e.currentTarget.children).filter(el => el.tagName === "DIV").map((child: HTMLElement) => child.children[0].children[2].value)


        console.log(answers)
        const res = await getCorrections(notes, answers, questions)

        const mes = res.message.content


        try {

            console.log(mes)

            let answersArr: {[question: string]: {correct: boolean, critique: string, question: string}} = JSON.parse(mes)


            setAnswers(answersArr)

        } catch(e) {

            alert(`Couldn't parse response: ${e}`)
        }

        setIsLoading(false)
        
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
                onSubmit={(e) => notesForm(e)}>
                    <Textarea
                    size="lg"
                    placeholder='Here is a sample placeholder'
                    className="text-slate-600" />
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
                <form className="px-10" onSubmit={(e) => answersForm(e)}>
                    {questions.map((question, i) => 
                    <div key={i}>
                            <FormControl className={`mb-10 ${Object.keys(answers).length > 0 ? answers[(i + 1).toString()]?.correct === true ? "bg-green-400" : "bg-red-400" : ""}`}>
                                <FormLabel className="font-bold text-slate-600">{`Question ${i+1}.`}</FormLabel>
                                <FormLabel className="font-medium text-slate-600">{`${question}.`}</FormLabel>
                                <Input placeholder='Answer' className="text-slate-600"/>
                            </FormControl>
                            {Object.keys(answers).length > 0 ? answers[(i + 1).toString()]?.critique ? 
                            <>{answers[(i + 1).toString()]?.critique}</> : 
                            <></> : 
                            <></>}
                        
                    </div>
                    )}
                    {questions.length > 0 ?
                    <Button
                    mt={4}
                    colorScheme='teal'
                    type='submit'
                    >
                        Submit
                    </Button> : <></>}
                </form>
                {isLoading ?
                <div 
                className="absolute top-0 left-0 right-0 bottom-0 h-screen bg-black opacity-50 grid place-items-center">
                    <Spinner thickness='7px'
                    speed='1s'
                    color='teal.200'
                    size='xl' />
                </div> : <></>}
            </main>
        </>
    )
}

export default Home