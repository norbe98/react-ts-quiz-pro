import type { TimerProps } from "../types/types";

export default function Timer({ isAnswered, secondsAnswered, seconds }: TimerProps) {

    if (isAnswered) {
        return (
            <div className="text-center">
                <p className="text-slate-400 text-sm">
                    Next question in <span className="font-bold text-white">{secondsAnswered}</span>...
                </p>
            </div>
        )
    }

    const isUrgent = seconds <= 3
    const percentage = (seconds / 10) * 100

    return (
        <div className="w-full">

            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">Time remaining</span>
                <span className={`font-bold text-lg ${isUrgent ? "text-red-500" : "text-white"}`}>
                    {seconds}s
                </span>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-linear ${isUrgent ? "bg-red-500" : "bg-blue-500"}`}
                    style={{ width: `${percentage}%` }}/>
            </div>
            
        </div>
    )
}