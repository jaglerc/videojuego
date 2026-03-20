import fondo from '../assets/fondo.png'
import logo from '../assets/logo.png'
import { createPlayer } from '../services/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const [name, setName] = useState('')
  const [region, setRegion] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const player = JSON.parse(localStorage.getItem('player'))
    if (player) {
      navigate('/game')
    }
  }, [])

  const handleStart = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    try {
      const res = await createPlayer(name)
      localStorage.setItem('player', JSON.stringify(res.data))
      navigate('/game', { state: { player: res.data } })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img src={fondo} alt="fondo" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-5 px-6">
        <img src={logo} alt="logo" className="w-[490px] h-[200px] object-contain" />
        <h1 className="text-white text-center text-xl leading-tight">
          LXIII ASAMBLEA
          <br />
          SCOUT NACIONAL
        </h1>
        <p className="mt-3 px-4 py-1 text-green-900 bg-white border border-white rounded-full text-sm font-semibold">
          ¡ES HORA DE JUGAR!
        </p>
        <p className="text-white mt-4 font-bold text-center text-sm leading-tight">
          SEMBRANDO EL BOSQUE
          <br />
          PROFUNDO
        </p>
        <form onSubmit={handleStart} className="flex flex-col w-full max-w-[280px] mt-6 gap-2">
          <label className="text-white font-bold text-sm">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-white bg-white rounded-full h-[38px] px-4 outline-none"
            placeholder="Escribe tu nombre"
          />
          <label className="text-white font-bold text-sm mt-2">Región</label>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border border-white bg-white rounded-full h-[38px] px-4 outline-none"
            placeholder="Escribe tu región"
          />
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className={`text-white bg-[#0A3634] rounded-full mt-6 py-2 font-bold ${loading || !name.trim() ? 'opacity-50' : ''}`}
          >
            {loading ? 'Cargando...' : 'COMENZAR'}
          </button>
        </form>
      </div>
    </div>
  )
}