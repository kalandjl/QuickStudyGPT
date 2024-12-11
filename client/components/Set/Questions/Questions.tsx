"use client"
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import QuestionsOps from "./QuestionsOps/QuestionsOps";
import Question from "./Question/index";
import { auth } from "../../../lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

interface Props {
    id: string
    content: {[x:string]: {
        answer: string
        question: string
    }}
    notes: string
    reload: React.Dispatch<React.SetStateAction<boolean>>
}

interface QuestionT {
    answer: string
    question: string
}
interface Answer {
    correct: null | boolean
    answer: string
}



const Questions: FC<Props> = (props: Props) => {

    let [user] = useAuthState(auth)

    const t = useSearchParams()
    let [answers, updateAnswers] = useState<{[x:string]: Answer}>({})
    
    let score = useMemo<number[]>(() => {

        // Num of correct
        let i = 0
        Object.keys(answers).forEach((x) => i += answers[x].correct ? 1 : 0)

        // Total answered
        let y = 0
        Object.keys(answers).forEach((x) => y += answers[x].correct === true || answers[x].correct === false ? 1 : 0)

        return [i, y]
    }, [answers])

    // Set data
    const { content } = props

    const q: {[id: string]: QuestionT} | undefined = useMemo(() => {

        
        let temp = {}
        Object.keys(content).forEach((question: string) => {
            temp = {...temp, [question]: {answer: "", correct: null}}
            updateAnswers(temp)
        })
        return content
    }, [])

    return (
        <>
            <div className="px-48' pt-10">
                <div id="score-wrap" className="font-bold text-xl text-stone-300">
                    {score ? `Score: ${Math.floor(score[0] / score[1] * 100)}% (${score[0]}/${score[1]})` : ""}
                </div>
                {q ? 
                    Object.keys(q).map((question, i: number) => {
                    // Split the question around the "_______" and render parts
                    const parts = q[question].question.split('_______');

                    return (
                        <Question 
                        reload={props.reload}
                        answers={answers} 
                        setAnswers={updateAnswers} 
                        question={question} 
                        parts={parts} 
                        q={q} 
                        i={i} 
                        id={props.id}
                        questionIndex={question}
                        key={i} 
                        curUid={user?.uid}/>
                    );
                    }) 
                    : ""
                }     
                <QuestionsOps id={props.id} notes={props.notes} prev={props.content} curUid={user?.uid} /> 
            </div>
        </>
    )
}
export default Questions