import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitAnswers } from '../services/api'
import fondo from '../assets/fondo.png'
import logoScout from '../assets/logoScout.png'
import arbol from '../assets/arbol.png'
import marcaDos from '../assets/marcaDos.png'
import num2 from '../assets/marcaDos.png'

export default function QuizPreguntaUno() {
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const question = {
        id: 1,
        text: 'Durante el 2026 el Consejo scout Nacional logró que Colombia fuera sede del MOOT 2030?',
        options: [
            { id: 1, text: 'VERDADERO' },
            { id: 2, text: 'FALSO' },
        ],
    }

    const handleAnswer = async (optionId) => {
        if (submitting) return

        const player = JSON.parse(localStorage.getItem('player'))
        const playerId = player?.id || 2

        setSubmitting(true)

        try {
            const payload = {
                playerId: playerId,
                standCode: 'CSN2026',
                answers: [
                    {
                        questionId: question.id,
                        optionId: optionId,
                    },
                ],
            }

            const res = await submitAnswers(payload)
            console.log('Respuesta enviada:', res.data)

            navigate('/resultado')
        } catch (err) {
            console.error('Error al enviar respuesta:', err)

            // Igual navega aunque falle el back
            navigate('/resultado')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="relative h-screen w-screen overflow-hidden font-sans">
            <img
                src={fondo}
                alt="fondo"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            <img
                src={marcaDos}
                alt="marca decorativa"
                className="absolute inset-0 w-10 h-10 object-cover z-[1] opacity-50 pointer-events-none"
            />

            <div className="absolute inset-0 z-10 flex flex-col p-8 md:p-12">
                <div className="flex justify-between items-center w-full mt-4">
                    <img src={num2} className="w-20 h-20 object-contain" alt="2" />
                    <div className="border-b-[3px] border-white pb-1">
                        <h1 className="text-white text-3xl font-black">RESPONDE</h1>
                    </div>
                </div>

                <div className="relative flex-grow flex items-center mt-12">
                    <div className="absolute left-0 z-20 w-[200px] -ml-32">
                        <img
                            src={arbol}
                            className="w-full h-auto object-contain scale-[2.2] origin-left mt-35 -ml-20"
                            alt="árbol"
                        />
                    </div>

                    <div className="w-full pl-24 pr-4">
                        <p className="text-white text-right text-lg -mr-7 font-bold leading-tight">
                            {question.text}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center -mr-40 mt-18 space-y-4">
                    <button
                        onClick={() => handleAnswer(1)}
                        disabled={submitting}
                        className="w-full max-w-[200px] bg-[#cbd5e1] text-[#0a4a43] font-black py-3 rounded-full text-base shadow-lg active:scale-95 transition-all disabled:opacity-50"
                    >
                        {submitting ? 'ENVIANDO...' : 'VERDADERO'}
                    </button>

                    <button
                        onClick={() => handleAnswer(2)}
                        disabled={submitting}
                        className="w-full max-w-[200px] bg-[#cbd5e1] text-[#0a4a43] font-black py-3 rounded-full text-base shadow-lg active:scale-95 transition-all disabled:opacity-50"
                    >
                        FALSO
                    </button>
                </div>

                <div className="flex justify-center -mb-8">
                    <img
                        src={logoScout}
                        className="w-full h-full object-contain mt-18"
                        alt="Logo Scouts"
                    />
                </div>
            </div>
        </div>
    )
}