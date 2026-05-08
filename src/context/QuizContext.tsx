import { createContext, useContext, useEffect, useState } from "react";
import type { Difficulty, Result, Question, QuizContextType } from "../types/types";
import { decodeHTML, addDate } from "../utils/helper";

const QuizStateProvider = createContext<QuizContextType | null>(null)

export default function QuizContext({ children } : { children: React.ReactNode }) {

    const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
    const [result, setResult] = useState<Result>({ date: "", correct: 0, incorrect: 0})
    const [questions, setQuestions] = useState<Question[]>([])
    const [results, setResults] = useState<Result[]>(() => {
        const stored = localStorage.getItem('results')
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        localStorage.setItem('results', JSON.stringify(results))
    }, [results])

    async function loadQuestions(diff: Difficulty) {
        try {
                setResult({ date: "", correct: 0, incorrect: 0 })
                setQuestions([])

                const res = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${diff}`)
                const data = await res.json()

            if (data.response_code !== 0) {
                alert("Could not load questions, please try again")
                return false
            }

                const decodedQuestions = data.results.map((q: Question) => {
                    const correct = decodeHTML(q.correct_answer)
                    const incorrect = q.incorrect_answers.map(a => decodeHTML(a))
        
                    return {
                    ...q, 
                    question: decodeHTML(q.question),
                    answers: [correct, ...incorrect].sort(() => Math.random() - 0.5),
                    correct_answer: correct,
                    incorrect_answers: incorrect
                }})

            setQuestions(decodedQuestions)
            return true
        } catch (error) {
            alert(error)
            return false
        }
    }

    function addResult(isCorrect: boolean) {
        setResult(prev => ({
            date: addDate(),
            correct: prev.correct + (isCorrect ? 1 : 0),
            incorrect: prev.incorrect + (isCorrect ? 0 : 1)
        }))
    }

    function changeIsCorrect(answer1: string | null, answer2: string) {
        const correct = answer1 === answer2
        addResult(correct)
    }

    function addResultToResults() {
        setResults(prev => [...prev, result])
    }

    function changeGameDifficulty(difficulty: Difficulty) {
        setDifficulty(difficulty)
    }

    function clearDifficulty() {
        setDifficulty(null)
    }

    function resetQuiz() {
    setQuestions([])
    setResult({ date: "", correct: 0, incorrect: 0 })
    setDifficulty(null)
}

    return (
        <QuizStateProvider.Provider value={{
            difficulty,
            changeGameDifficulty,
            clearDifficulty,
            result,
            addResult,
            changeIsCorrect,
            addResultToResults,
            results,
            loadQuestions,
            questions,
            resetQuiz,
        }}>
            {children}
        </QuizStateProvider.Provider>
    )
}

export function useQuizState() {
    const ctx = useContext(QuizStateProvider)
    if (!ctx) throw new Error("Something went wrong!");
    return ctx
}