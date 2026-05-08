export type QuizContextType = {
    difficulty: Difficulty | null,
    changeGameDifficulty: (diff: Difficulty) => void,
    result: Result,
    addResult: (isCorrect: boolean) => void,
    changeIsCorrect: (answer1: string | null, answer2: string) => void,
    addResultToResults: () => void,
    results: Result[],
    loadQuestions: (diff: Difficulty) => Promise<boolean>,
    questions: Question[],
    resetQuiz: () => void,
    clearDifficulty: () => void
}

export type Difficulty = "easy" | "medium" | "hard"

export type Result = {
    date: string
    correct: number,
    incorrect: number
}

export type Question = {
    question: string,
    answers: string[],
    correct_answer: string,
    incorrect_answers: string[]
}

export type QuestionProps = {
    q: Question,
    changeIsCorrect: (answer1: string | null, answer2: string) => void,
    nextQuestion: () => void,
    currentIndex: number
}

export type TimerProps = {
    isAnswered: boolean,
    secondsAnswered: number,
    seconds: number
}
