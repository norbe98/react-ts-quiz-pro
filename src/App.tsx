import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Results from "./pages/Results";
import Play from "./pages/Play";
import Navbar from "./components/Navbar";
import Protected from "./components/Protected";
import NotFound from "./pages/NotFound";

export default function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 text-white">

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/quiz" element={<Protected><Quiz /></Protected>} />
          <Route path="/result" element={<Result />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

    </div>
  )
}