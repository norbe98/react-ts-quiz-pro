import { Navigate } from "react-router-dom";
import { useQuizState } from "../context/QuizContext";

export default function Protected({ children }: {children: React.ReactNode}) {

    const { difficulty } = useQuizState()

    if (!difficulty) {
        return <Navigate to="/play" replace />
    }

    return (
        <>
        {children}
        </>
    )

}