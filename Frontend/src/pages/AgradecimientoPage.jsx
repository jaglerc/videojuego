import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProgress } from '../services/api'
import fondoBosque2 from '../assets/fondoBosque2.png'
import logoScout from '../assets/logoScout.png'
import semilla from '../assets/semillaIndividual.png'
import FinalPage from './FinalPage'

export default function AgradecimientoPage() {
  const [progress, setProgress] = useState(null)
  const [trees, setTrees] = useState([false, false, false])
  const navigate = useNavigate()

 useEffect(() => {
  const player = JSON.parse(localStorage.getItem('player'))
  if (!player) {
    navigate('/')
    return
  }

  const fetchProgress = async () => {
    try {
      const res = await getProgress(player.id)
      setProgress(res.data)
      const seeds = res.data.seeds || 0
      if (seeds >= 1) setTimeout(() => setTrees([true, false, false]), 500)
      if (seeds >= 2) setTimeout(() => setTrees([true, true, false]), 1500)
      if (seeds >= 3) setTimeout(() => setTrees([true, true, true]), 2500)
    } catch (err) {
      console.error(err)
    }
  }

  fetchProgress()

  const timer = setTimeout(() => {
    navigate('/final')
  }, 10000)

  return () => clearTimeout(timer)
}, [])
  const seeds = progress?.seeds || 0

  return (
    <div className="relative min-h-screen h-dvh w-full overflow-hidden font-sans flex flex-col items-center">
      <img src={fondoBosque2} alt="fondo" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black/5 z-0" />

      <div className="relative z-10 flex flex-col items-center w-full h-full">
        <div className="flex flex-col items-center pt-10 sm:pt-16 px-6 w-full">

         <div className="flex justify-center items-center space-x-2 mb-6 h-24">
  {[0, 1, 2].map((i) => (
    <div key={i} className={`flex flex-col items-center ${i === 1 ? 'translate-y-4' : '-translate-y-2'}`}>
      <span style={{
        fontSize: trees[i] ? '3.5rem' : '1.5rem',
        transition: 'font-size 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
        filter: trees[i] ? 'none' : 'grayscale(100%)',
        display: 'block',
        marginTop: '2.5rem',
      }}>
        {trees[i] ? '🌳' : '🌱'}
      </span>
    </div>
  ))}
</div>
          <div className="bg-[#0a4a43] border-[3px] border-white mt-15 px-6 py-2 rounded-lg mt-8 shadow-xl mb-6 inline-block">
            <h2 className="text-white text-xl sm:text-2xl font-bold whitespace-nowrap">
              Obtuviste {seeds} Semillas
            </h2>
          </div>
        </div>

        <div className="mt-auto w-full flex flex-col items-center">
          <div className="w-full bg-[#0a4a43] py-5 shadow-[0_-5px_15px_rgba(0,0,0,0.2)]">
            <h3 className="text-white text-lg sm:text-xl font-black leading-tight tracking-tighter text-center uppercase">
              ¡Gracias a la <br /> gestión de todo <br /> un país scout!
            </h3>
          </div>
          <div className="flex justify-center w-full -mb-2 mt-10">
            <img src={logoScout} className="w-150 h-auto object-contain -mb-17" alt="Logo Scouts" />
          </div>
        </div>
      </div>
    </div>
  )
}