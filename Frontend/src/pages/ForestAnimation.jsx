import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProgress } from '../services/api'

export default function ForestAnimation() {
  const [trees, setTrees] = useState([false, false, false])
  const [progress, setProgress] = useState(null)
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
        const timers = []
        if (seeds >= 1) timers.push(setTimeout(() => setTrees([true, false, false]), 500))
        if (seeds >= 2) timers.push(setTimeout(() => setTrees([true, true, false]), 1500))
        if (seeds >= 3) timers.push(setTimeout(() => setTrees([true, true, true]), 2500))
        return () => timers.forEach(clearTimeout)
      } catch (err) {
        console.error(err)
      }
    }

    fetchProgress()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a3a2a 0%, #0f2318 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '2rem',
    }}>
      <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
        ¡Tu bosque está creciendo!
      </h2>

      {progress && (
        <p style={{ color: '#a8d5b5', fontSize: '1rem' }}>
          Hola, {progress.name}
        </p>
      )}

      <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end' }}>
        {trees.map((grown, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{
              fontSize: grown ? '5rem' : '2rem',
              transition: 'font-size 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              filter: grown ? 'none' : 'grayscale(100%)',
            }}>
              {grown ? '🌳' : '🌱'}
            </span>
            <div style={{
              width: '8px',
              height: grown ? '40px' : '10px',
              background: '#5a3e1b',
              borderRadius: '4px',
              transition: 'height 0.8s ease',
            }} />
          </div>
        ))}
      </div>

      {progress && (
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '1.5rem 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
          <p style={{ color: '#ffffff', fontSize: '1rem' }}>
            Semillas conseguidas: <strong>{progress.seeds}</strong> de 3
          </p>
          <p style={{ color: '#a8d5b5', fontSize: '1rem' }}>
            Total de puntos: <strong>{progress.totalPoints}</strong>
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', marginTop: '1rem' }}>
        <span style={{ fontSize: '2rem' }}>⚜️</span>
        <p style={{ color: '#a8d5b5', fontSize: '0.85rem' }}>Scouts de Colombia</p>
      </div>
    </div>
  )
}