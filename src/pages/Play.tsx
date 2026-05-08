import { useNavigate } from "react-router-dom"
import { useQuizState } from "../context/QuizContext"
import type { Difficulty } from "../types/types"
import { useEffect, useState } from "react"

export default function Play() {

    const { changeGameDifficulty, loadQuestions, clearDifficulty } = useQuizState()
    const navigate = useNavigate()

    const [selected, setSelected] = useState<Difficulty | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        clearDifficulty()
    }, [])

    async function handleStart() {
        if (!selected) {
            alert("Choose a difficulty first!")
            return
        }
        setLoading(true)
        changeGameDifficulty(selected)
        const success = await loadQuestions(selected)
        setLoading(false)
        if (success) navigate("/quiz")
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
                <p className="text-xl font-semibold">Loading questions...</p>
                <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        )
    }

    function getDifficultyClass(diff: Difficulty) {
        const base = "py-3 px-8 rounded-lg font-medium transition-colors"
        const isSelected = selected === diff
        return `${base} ${isSelected ? "bg-blue-600 text-white" : "bg-slate-700 hover:bg-slate-600"}`
    }

    return (
        <div className="flex flex-col items-center gap-8 max-w-md w-full mx-auto bg-slate-800 rounded-xl p-8 md:p-12">
            
            <h2 className="text-2xl md:text-3xl font-bold text-center">
                Choose your difficulty
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                    onClick={() => setSelected("easy")}
                    className={getDifficultyClass("easy")}>
                    Easy
                </button>

                <button
                    onClick={() => setSelected("medium")}
                    className={getDifficultyClass("medium")}>
                    Medium
                </button>

                <button
                    onClick={() => setSelected("hard")}
                    className={getDifficultyClass("hard")}>
                    Hard
                </button>
            </div>

            <button 
                onClick={handleStart}
                disabled={!selected}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-colors w-full sm:w-auto">
                Let's see the questions!
            </button>
            
        </div>
    )
}