"use client"
import { FC, useEffect, useState } from "react";
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
    curUid: string | undefined
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

    useEffect(() => {
        if (answerRevealed) {
            // Update the answer in the state with the correct answer when revealed
            setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [question]: { answer: q[question].answer.toLocaleLowerCase(), correct: false },
            }));
        }
    }, [answerRevealed, q, question, setAnswers]);

    return (
        <>  
            <div id="question-wrap" className="border-stone-600 rounded-md border-2 my-3">
                <div id="top-ops-wrap" className="py-2 pl-5" onClick={() => {setAnswerRevealed(true); setAnswers({...answers, [question]: {answer: answers[question].answer, correct: false}})}}>
                    <p className="text-blue-500 hover:cursor-pointer">See answer</p>
                </div>
                <div id="question-main-wrap" className="flex gap-4 py-3">
                    <div id="ops-wrap" className="">
                        <QuestionOps 
                        question={props.questionIndex} 
                        id={props.id} 
                        reload={props.reload} 
                        curUid={props.curUid} />
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


                        <div className={`font-semibold text-stone-200`}>
                            {parts[0]}
                            <input
                            type="text"
                            value={answerRevealed 
                                ? q[question].answer.toLocaleLowerCase() 
                                : answers[question]?.answer || ""
                            }
                            className={`border-b-2 border-stone-500 outline-none pl-1 bg-transparent ${
                                answerRevealed ? "text-red-600" : "text-stone-300"
                            }`}
                            style={{ width: `${(q[question].answer.toLocaleLowerCase().length * 10) + 10}px` }}
                            placeholder=""
                            key={`input-${i}`}
                            onChange={(e) => {

                                setAnswerRevealed(false)
                                if (!answerRevealed) {
                                    return setAnswers({
                                        ...answers,
                                        [question]: { answer: e.target.value, correct: null },
                                    });
                                }
                            }}
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