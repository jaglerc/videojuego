import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getStand, submitAnswers, getProgress } from '../services/api'
import fondo from '../assets/fondo.png'
import logoScout from '../assets/logoScout.png'
import arbol from '../assets/arbol.png'
import marcaDos from '../assets/marcaDos.png'

export default function QuizPreguntaUno() {
  const [submitting, setSubmitting] = useState(false)
  const [stand, setStand] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const standCode = searchParams.get('stand') || 'stand-1'

  useEffect(() => {
    const fetchStand = async () => {
      try {
        const player = JSON.parse(localStorage.getItem('player'))
        if (!player) {
          navigate('/')
          return
        }

        const progressRes = await getProgress(player.id)
        const alreadyDone = progressRes.data.completedStands?.some(
          (s) => s.standCode === standCode
        )
        if (alreadyDone) {
          navigate('/demo')
          return
        }

        const res = await getStand(standCode)
        setStand(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStand()
  }, [standCode])

  const handleAnswer = (optionId, questionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const handleNext = async () => {
    const questions = stand?.questions || []
    const isLast = currentIndex === questions.length - 1

    if (isLast) {
      const player = JSON.parse(localStorage.getItem('player'))
      if (!player) {
        navigate('/')
        return
      }

      setSubmitting(true)
      try {
        const answersArray = Object.entries(answers).map(([questionId, optionId]) => ({
          questionId,
          optionId,
        }))

        const res = await submitAnswers({
          playerId: player.id,
          standCode,
          answers: answersArray,
        })
        navigate('/resultado', { state: { result: res.data } })
      } catch (err) {
        console.error('Error al enviar respuesta:', err)
        if (err.response?.data?.message === 'Ya completaste este stand') {
          navigate('/resultado', { state: { result: { correctAnswers: 0, seedEarned: false, alreadyCompleted: true } } })
        } else {
          navigate('/resultado', { state: { result: { correctAnswers: 0, seedEarned: false } } })
        }
      } finally {
        setSubmitting(false)
      }
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  if (loading) return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #1a3a2a 0%, #0f2318 100%)' }}>
      <p className="text-white text-lg">Cargando...</p>
    </div>
  )

  const questions = stand?.questions || []
  const question = questions[currentIndex]
  const isLast = currentIndex === questions.length - 1
  const currentAnswered = answers[question?.id]

  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans">
      <img src={fondo} alt="fondo" className="absolute inset-0 w-full h-full object-cover z-0" />
      <img src={marcaDos} alt="marca decorativa" className="absolute inset-0 w-10 h-10 object-cover z-[1] opacity-50 pointer-events-none" />

      <div className="absolute inset-0 z-10 flex flex-col p-8 md:p-12">
        <div className="flex justify-between items-center w-full mt-4">
          <img src={marcaDos} className="w-20 h-20 object-contain" alt="2" />
          <div className="border-b-[3px] border-white pb-1">
            <h1 className="text-white text-3xl font-black">RESPONDE</h1>
          </div>
        </div>

        <p className="text-white text-right text-sm mt-2 opacity-70">
          {currentIndex + 1} / {questions.length}
        </p>

        <div className="relative flex-grow flex items-center mt-6">
          <div className="absolute left-0 z-20 w-[200px] -ml-32">
            <img src={arbol} className="w-full h-auto object-contain scale-[2.2] origin-left mt-35 -ml-20" alt="árbol" />
          </div>
          <div className="w-full pl-24 pr-4">
            <p className="text-white text-right text-lg -mr-7 font-bold leading-tight">
              {question?.text}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center -mr-40 mt-4 space-y-4">
          {question?.options?.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id, question.id)}
              disabled={submitting}
              className={`w-full max-w-[200px] font-black py-3 rounded-full text-base shadow-lg active:scale-95 transition-all disabled:opacity-50 ${
                currentAnswered === option.id
                  ? 'bg-[#0a4a43] text-white border-2 border-white'
                  : 'bg-[#cbd5e1] text-[#0a4a43]'
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>

        {currentAnswered && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleNext}
              disabled={submitting}
              className="bg-[#0a4a43] text-white font-black px-8 py-3 rounded-full text-base shadow-lg active:scale-95 transition-all disabled:opacity-50 border-2 border-white"
            >
              {submitting ? 'ENVIANDO...' : isLast ? 'FINALIZAR' : 'SIGUIENTE →'}
            </button>
          </div>
        )}

        <div className="flex justify-center -mb-8">
          <img src={logoScout} className="w-full h-full object-contain mt-4" alt="Logo Scouts" />
        </div>
      </div>
    </div>
  )
}