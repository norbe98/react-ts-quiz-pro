import { Link, NavLink } from "react-router-dom"
import { useState } from "react"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const linkClass = "px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors"

    return (
        <nav className="bg-slate-800 border-b border-slate-700">
            
            <div className="flex items-center justify-between px-4 py-4">
                <Link to="/" className="text-xl font-bold">
                    🧠 QuizApp
                </Link>
                
                <div className="hidden md:flex gap-2">
                    <NavLink to="/" className={linkClass}>Home</NavLink>
                    <NavLink to="/play" className={linkClass}>Play</NavLink>
                    <NavLink to="/results" className={linkClass}>Results</NavLink>
                </div>
                
                <button 
                    onClick={() => setIsOpen(prev => !prev)}
                    className="md:hidden text-2xl">
                    ☰
                </button>
            </div>
            
            {isOpen && (
                <div className="md:hidden flex flex-col gap-1 px-4 pb-4">
                    <NavLink to="/" onClick={() => setIsOpen(false)} className={`text-center ${linkClass}`}>Home</NavLink>
                    <NavLink to="/play" onClick={() => setIsOpen(false)} className={`text-center ${linkClass}`}>Play</NavLink>
                    <NavLink to="/results" onClick={() => setIsOpen(false)} className={`text-center ${linkClass}`}>Results</NavLink>
                </div>
            )}
        </nav>
    )
}