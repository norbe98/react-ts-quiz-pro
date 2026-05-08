import { useEffect, useState } from "react"
import type { QuestionProps } from "../types/types"
import Timer from "./Timer"

export default function QuestionCard({ q, changeIsCorrect, nextQuestion }: QuestionProps) {

    const [selected, setSelected] = useState<string | null>(null)
    const [seconds, setSeconds] = useState<number>(10)
    const [secondsAnswered, setSecondsAnswered] = useState<number>(3)

    function getButtonColor(answer: string): string {
        if (selected === null) return "bg-gray-700"
        if (answer === q.correct_answer) return "bg-green-800"
        if (answer === selected) return "bg-red-800"
        return "bg-gray-700"
    }

    function handleClick(answer: string | null) {
        setSelected(answer ?? "TIMEOUT")
        changeIsCorrect(answer, q.correct_answer)
    }

    useEffect(() => {
        setSeconds(10)
        setSecondsAnswered(3)
        setSelected(null)
    }, [q])

    useEffect(() => {
        if (selected !== null) return
        
        const interval = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(interval)
                    handleClick(null)
                    return 10
                }
                return prev - 1
            })
        }, 1000)
        
        return () => clearInterval(interval)
    }, [q, selected])

    useEffect(() => {
        if (selected === null) return
        
        const interval = setInterval(() => {
            setSecondsAnswered(prev => {
                if (prev <= 1) {
                    clearInterval(interval)
                    nextQuestion()
                    return 3
                }
                return prev - 1
            })
        }, 1000)
        
        return () => clearInterval(interval)
    }, [selected])

    return (
        <div className="bg-slate-800 rounded-xl p-6 md:p-8 w-full flex flex-col gap-6">
            
            <Timer 
                isAnswered={selected !== null} 
                secondsAnswered={secondsAnswered} 
                seconds={seconds}/>
            
            <p className="text-lg md:text-xl font-medium leading-relaxed">
                {q.question}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.answers.map(answer =>
                    <button 
                        key={answer} 
                        className={`${getButtonColor(answer)} px-4 py-3 rounded-lg text-left transition-colors font-medium`}
                        onClick={() => handleClick(answer)} 
                        disabled={selected !== null}>
                        {answer}
                    </button>
                )}
            </div>

        </div>  
    )
}