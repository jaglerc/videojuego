import { useEffect, useState } from 'react'

export default function ForestAnimation() {
  const [trees, setTrees] = useState([false, false, false])

  useEffect(() => {
    const timers = [
      setTimeout(() => setTrees([true, false, false]), 500),
      setTimeout(() => setTrees([true, true, false]), 1500),
      setTimeout(() => setTrees([true, true, true]), 2500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a3a2a 0%, #0f2318 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
    }}>
      <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 'bold' }}>
        Tu bosque está creciendo
      </h2>

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

      <p style={{ color: '#a8d5b5', fontSize: '0.9rem' }}>
        {trees.filter(Boolean).length} de 3 semillas conseguidas
      </p>

      <button
        onClick={() => setTrees([false, false, false]) || setTimeout(() => {
          setTrees([true, false, false])
          setTimeout(() => setTrees([true, true, false]), 1000)
          setTimeout(() => setTrees([true, true, true]), 2000)
        }, 100)}
        style={{
          padding: '0.8rem 2rem',
          borderRadius: '12px',
          border: 'none',
          background: '#2d6a4f',
          color: '#ffffff',
          fontSize: '1rem',
          cursor: 'pointer',
          marginTop: '1rem',
        }}
      >
        Repetir animación
      </button>
    </div>
  )
}