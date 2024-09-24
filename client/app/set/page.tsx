"use client"

import { object } from "framer-motion/client";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface Question {
    answer: string
    question: string
}

interface Answer {
    correct: null | boolean
    answer: string
}

const Home: NextPage = () => {

    const t = useSearchParams()

    let [answers, updateAnswers] = useState<{[x:string]: Answer}>({})

    const q: {[id: string]: Question} | undefined = useMemo(() => {

        const params = t.get("q")
            ?.replace("json", "")
            .replace(/\\n/g, '')      
            .replace(/\\\"/g, '"')       
            .replace(/^\s+/g, '')  
            .replace(/\s+$/g, '') 
            .replace(/\\/g, '')      
            .replace(/^"+|"+$/g, '')
            .replace(/```/g, '');
        
        if (!params) throw new Error("no params")

        try {
            let res = JSON.parse(params ?? "")

            let temp = {}
            Object.keys(res).forEach((question: string) => {
                temp = {...temp, [question]: {answer: "", correct: null}}

                updateAnswers(temp)
            })

            return res
        } catch (e) {

            console.error("Error", e)
        }
    }, [])

    useEffect(() => {
        console.log(answers)
    }, [answers])


    return (
        <>
            <div className="px-64 pt-10">
                {q ? 
                    Object.keys(q).map((question, i: number) => {
                    // Split the question around the "_______" and render parts
                    const parts = q[question].question.split('_______');

                    return (
                        <form 
                        onSubmit={(e) => {

                            e.preventDefault()

                            if (!answers[question]) return
                            
                            console.log(q[question].answer === answers[question].answer)
                            console.log()

                            if (q[question].answer.toLocaleLowerCase() === answers[question].answer.toLocaleLowerCase()) {
                                
                                // Correct true
                                return updateAnswers({...answers, [question]: {answer: answers[question].answer, correct: true}})
                            }


                            // Correct false
                            updateAnswers({...answers, [question]: {...answers[question], correct: false}})
                        }}
                        key={i} 
                        className="my-5 flex">
                            <div className={`h-6 w-6 border-2 border-gray-700 mr-10
                            ${Object.keys(answers).length > 0 ? 
                            answers[question]?.correct == false || answers[question].correct == true ? 
                            answers[question].correct ? "bg-green-500" : "bg-red-500"
                            : "" : ""}`}
                            id="correct-box"></div>
                            <div className={`font-semibold mb-2 text-black`}>
                                {/* Render the parts of the question and insert the input field */}
                                {parts[0]}
                                <input 
                                type="text" 
                                className="border-b-2 border-gray-500 outline-none"
                                placeholder=""
                                key={`input-${i}`}
                                onChange={(e) => updateAnswers({...answers, [question]: {answer: e.target.value, correct: null}})
                                }
                                />
                                {parts[1]}
                                <button type="submit" hidden></button>
                            </div>
                        </form>
                    );
                    })
                    : ""
                }      
            </div>
        </>
    )
}

export default Home