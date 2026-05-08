import { useNavigate } from "react-router-dom"
import { useQuizState } from "../context/QuizContext"

export default function Results() {

    const { results } = useQuizState()
    const navigate = useNavigate()

    if (results.length === 0) {
        return (
            <div className="flex flex-col items-center gap-6 max-w-md w-full mx-auto bg-slate-800 rounded-xl p-8 text-center">
                <p className="text-xl">No games played yet!</p>
                <button 
                    onClick={() => navigate("/play")}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                    Start your first game
                </button>
            </div>
        )
    }

    const reversedResults = [...results].reverse()

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Game History</h2>
                <p className="text-slate-400">{results.length} {results.length === 1 ? "game" : "games"} played</p>
            </div>

            <div className="flex flex-col gap-3">
                {reversedResults.map((result, index) => {
                    const score = result.correct
                    const total = result.correct + result.incorrect
                    const isGreat = score >= 8
                    const isGood = score >= 5
                    const scoreColor = isGreat ? "text-green-400" : isGood ? "text-yellow-400" : "text-red-400"
                    
                    return (
                        <div 
                            key={result.date + index}
                            className="bg-slate-800 rounded-xl p-4 md:p-6 flex items-center justify-between gap-4">

                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-slate-400">{result.date}</p>

                                <div className="flex gap-3 text-sm">
                                    <span className="text-green-400">✓ {result.correct}</span>
                                    <span className="text-red-400">✗ {result.incorrect}</span>
                                </div>

                            </div>

                            <div className={`text-3xl md:text-4xl font-bold ${scoreColor}`}>
                                {score}/{total}
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}