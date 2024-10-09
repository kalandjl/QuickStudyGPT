"use client"
import { FC, useState } from "react";
import QuestionOps from "./QuestionOps";

interface Props {
    setAnswers: React.Dispatch<React.SetStateAction<{[x:string]: Answer}>>
    answers: {[x:string]: Answer}
    question: string
    parts: string[]
    q: {[id: string]: QuestionT}
    i: number
    id: string
    questionIndex: string
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

const Question: FC<Props> = (props) => {

    const { answers, setAnswers, question, parts, q, i } = props

    let [answerRevealed, setAnswerRevealed] = useState<boolean>(false)

    return (
        <>  
            <div id="question-wrap" className="border-gray-200 rounded-md border-2 my-3">
                <div id="top-ops-wrap" className="py-2 pl-5" onClick={() => setAnswerRevealed(true)}>
                    <p className="text-blue-500 hover:cursor-pointer">See answer</p>
                </div>
                <div id="question-main-wrap" className="flex gap-4 py-3">
                    <div id="ops-wrap" className="">
                        <QuestionOps 
                        question={props.questionIndex} 
                        id={props.id} 
                        reload={props.reload} />
                    </div>
                    <form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (!answers[question]) return
                        
                        if (q[question].answer.toLocaleLowerCase() === answers[question].answer.toLocaleLowerCase()) {
                            
                            // Correct true
                            return setAnswers({...answers, [question]: {answer: answers[question].answer, correct: true}})
                        }
                        // Correct false
                        setAnswers({...answers, [question]: {...answers[question], correct: false}})
                    }}
                    className="grid place-items-center grid-flow-col">

                        {/* Green or red depending on questions answer */}
                        <div className={`h-6 w-6 border-2 border-gray-700 mr-10 rounded-md
                        ${Object.keys(answers).length > 0 ? 
                        answers[question]?.correct == false || answers[question].correct == true ? 
                        answers[question].correct ? "bg-green-500" : "bg-red-500"
                        : "" : ""}`}
                        id="correct-box"></div>


                        <div className={`font-semibold text-black`}>
                            {/* Render the parts of the question and insert the input field */}
                            {parts[0]}
                            <input 
                            type="text" 
                            defaultValue={`${answerRevealed ? q[question].answer.toLocaleLowerCase() : ""}`}
                            className={`border-b-2 border-gray-500 outline-none pl-1 
                            ${answerRevealed ? "text-red-600" : "text-black"}`}
                            style={{width:`${q[question].answer.toLocaleLowerCase().split("").length * 10}px`}}
                            placeholder=""
                            key={`input-${i}`}
                            onChange={(e) => setAnswers({...answers, [question]: {answer: e.target.value, correct: null}})
                            }
                            />
                            {parts[1]}
                            <button type="submit" hidden></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Question