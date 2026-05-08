import { useNavigate } from "react-router-dom"

export default function Home() {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center gap-12 py-16">
            
            <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-3">
                    Welcome to the Quiz App!
                </h2>

                <p className="text-slate-400">
                    Test your knowledge across various topics
                </p>
            </div>

            <div className="flex flex-col items-center gap-6 bg-slate-800 rounded-xl p-8 md:p-12 max-w-md w-full">
                <p className="text-xl text-center">
                    Ready to test yourself? Pick a difficulty and let's go!
                </p>

                <button 
                    onClick={() => navigate("/play")}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                    Start a game
                </button>
            </div>

        </div>
    )
}