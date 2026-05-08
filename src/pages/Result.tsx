import { useNavigate } from "react-router-dom"
import { useQuizState } from "../context/QuizContext"
import { useEffect } from "react"

export default function Result() {

    const { results, resetQuiz, clearDifficulty } = useQuizState()
    const navigate = useNavigate()

    const lastResult = results[results.length - 1]

    useEffect(() => {
        clearDifficulty()
    }, [])

    function startNewGame() {
        resetQuiz()
        navigate("/play")
    }

    if (!lastResult) {
        return (
            <div className="flex flex-col items-center gap-6 max-w-md w-full mx-auto bg-slate-800 rounded-xl p-8 text-center">
                <p className="text-xl">You haven't played a game yet!</p>
                <button 
                    onClick={startNewGame}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                    Start a game
                </button>
            </div>
        )
    }

    const score = lastResult.correct
    const isGreat = score >= 8
    const isGood = score >= 5 && score < 8
    
    let message = "Better luck next time!"
    let scoreColor = "text-red-400"
    
    if (isGreat) {
        message = "Excellent! 🎉"
        scoreColor = "text-green-400"
    } else if (isGood) {
        message = "Nice job! 👍"
        scoreColor = "text-yellow-400"
    }

    return (
        <div className="flex flex-col items-center gap-6 max-w-md w-full mx-auto bg-slate-800 rounded-xl p-8 md:p-12 text-center">
            
            <h2 className="text-2xl md:text-3xl font-bold">{message}</h2>
            
            <div className="flex flex-col items-center gap-2">
                <p className="text-slate-400">Your score</p>
                <p className={`text-6xl md:text-7xl font-bold ${scoreColor}`}>
                    {score}/10
                </p>
            </div>
            
            <div className="flex gap-6 text-sm">
                <div className="flex flex-col items-center">
                    <span className="text-green-400 font-bold text-2xl">{lastResult.correct}</span>
                    <span className="text-slate-400">Correct</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-red-400 font-bold text-2xl">{lastResult.incorrect}</span>
                    <span className="text-slate-400">Incorrect</span>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button 
                    onClick={startNewGame}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                    Play again
                </button>
                <button 
                    onClick={() => navigate("/results")}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                    History
                </button>
            </div>
        </div>
    )
}