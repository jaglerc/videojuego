import { useLocation, useNavigate } from 'react-router-dom'
import fondo from '../assets/fondo.png'
import logoScout from '../assets/logoScout.png'
import marcaDos from '../assets/marcaDos.png'
import marcaCuatro from '../assets/marcaCuatro.png'
import marco from '../assets/marco.png'

export default function LogroPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = location.state?.result
  const seedEarned = result?.seedEarned ?? false
  const correctAnswers = result?.correctAnswers ?? 0
  const alreadyCompleted = result?.alreadyCompleted ?? false

  const handleContinue = () => {
    navigate('/game')
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans">
      <img src={fondo} alt="fondo" className="absolute inset-0 w-full h-full object-cover z-0" />
      <img src={marcaDos} className="absolute inset-0 w-10 h-10 object-cover z-1 opacity-50 pointer-events-none" />

      <div className="absolute inset-0 z-10 flex flex-col p-8 md:p-12">
        <h1 className="text-white text-3xl font-black ml-40 mt-10">
          {alreadyCompleted ? '¡OJO!' : seedEarned ? '¡BIEN!' : '¡SIGUE!'}
        </h1>
        <img src={marcaCuatro} className="w-30 h-20 object-contain -mt-17 ml-68" alt="2" />

        <div className="relative flex justify-center items-center">
          <img src={marco} className="h-60 w-[350px] ml-22 object-contain scale-110 -mt-5" alt="marco" />
        </div>

        <div className="flex flex-col items-center -mt-20 relative z-10">
          <p className="text-white text-center font-bold text-lg leading-tight mt-10">
            {alreadyCompleted
              ? 'Ya respondiste este stand'
              : seedEarned
              ? '¡Lograste conseguir una semilla!'
              : 'No lograste la semilla esta vez'}
          </p>
        </div>

        <div className="mx-auto w-full max-w-[250px] h-[170px] border-[7px] border-white rounded-[20px] mb-5 px-4 py-5 mt-5 text-center bg-[#0a4a43]/85">
          {alreadyCompleted ? (
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl">⚠️</span>
              <p className="text-white font-bold">Visita otro stand</p>
            </div>
          ) : seedEarned ? (
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl">🌰</span>
              <p className="text-white font-bold">Tienes 1 semilla</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl">😔</span>
              <p className="text-white font-bold">
                Respondiste {correctAnswers} correctamente
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleContinue}
          className="bg-[#0A4A43] w-50 ml-14 text-white font-extrabold text-[9px] px-7 py-2 rounded-full uppercase shadow-md hover:bg-[#0d5e55] transition-colors"
        >
          ¿Seguimos?
        </button>

        <div className="flex justify-center -mb-8">
          <img src={logoScout} className="w-full h-full object-contain mt-14" alt="Logo Scouts" />
        </div>
      </div>
    </div>
  )
}