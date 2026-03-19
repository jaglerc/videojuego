import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import QuizPreguntaUno from './pages/QuizPreguntaUno'
import LogroPage from './pages/LogroPage'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<RegisterPage />} />
            <Route path="/instrucciones" element={<QuizPage />} />
            <Route path="/quiz" element={<QuizPreguntaUno />} />
            <Route path="/resultado" element={<LogroPage />} />
        </Routes>
    )
}