import { useState, useEffect } from "react"
import { useQuizState } from "../context/QuizContext"
import { useNavigate } from "react-router-dom"
import QuestionCard from "../components/QuestionCard"


export default function Quiz() {

    const { result, changeIsCorrect, addResultToResults, questions, resetQuiz } = useQuizState()
    const navigate = useNavigate()

    const [currentIndex, setCurrentIndex] = useState<number>(0)

    useEffect(() => {
        if (result.correct + result.incorrect === 10) {
            addResultToResults()
            navigate("/result")
        }
    }, [result.correct, result.incorrect])

    function nextQuestion() {
        setCurrentIndex(prev => prev + 1)
    }

    function handleCancel() {
        const confirmed = window.confirm("Are you sure you want to cancel the game?")
        if (confirmed) {
            resetQuiz()
        }
    }

    if (questions.length === 0) {
        return null
    }

    return (
        <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
            
            <div className="flex justify-between items-center w-full text-sm text-slate-400">
                <span>Question {currentIndex + 1} of 10</span>
                <span>Score: {result.correct} / {result.correct + result.incorrect}</span>
            </div>
            
            <QuestionCard 
                q={questions[currentIndex]} 
                changeIsCorrect={changeIsCorrect} 
                nextQuestion={nextQuestion} 
                currentIndex={currentIndex}/>
            
            <button 
                onClick={handleCancel}
                className="text-slate-400 hover:text-white text-sm underline italic transition-colors">
                Cancel the game
            </button>
        </div>
    )
}