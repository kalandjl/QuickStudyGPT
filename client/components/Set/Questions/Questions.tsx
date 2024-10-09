"use client"
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import QuestionsOps from "./QuestionsOps/QuestionsOps";
import Question from "./Question/index";

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

    const t = useSearchParams()
    let [answers, updateAnswers] = useState<{[x:string]: Answer}>({})

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
            <div className="px-64 pt-10">
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
                        key={i} />
                    );
                    }) 
                    : ""
                }     
                <QuestionsOps id={props.id} notes={props.notes} prev={props.content} /> 
            </div>
        </>
    )
}
export default Questions