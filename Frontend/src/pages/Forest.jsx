import { useEffect, useState } from 'react'
import { getProgress } from '../services/api'

export default function Forest({ player, onScanQR }) {
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    const fetchProgress = async () => {
      const res = await getProgress(player.id)
      setProgress(res.data)
    }
    fetchProgress()
  }, [player.id])

  const stands = [
    { code: 'stand-1', title: 'El Bosque Primario' },
    { code: 'stand-2', title: 'La Selva Húmeda' },
    { code: 'stand-3', title: 'Los Páramos' },
  ]

  const isCompleted = (code) =>
    progress?.completedStands?.some((s) => s.standCode === code)

  const trees = progress?.seeds || 0

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <p style={styles.greeting}>Hola, {player.name}</p>
        <div style={styles.seedsRow}>
          {[...Array(3)].map((_, i) => (
            <span key={i} style={styles.tree}>
              {i < trees ? '🌳' : '🌱'}
            </span>
          ))}
        </div>
        <p style={styles.points}>
          {progress?.totalPoints || 0} puntos
        </p>
      </div>

      <div style={styles.card}>
        <p style={styles.instructions}>
          Visita los stands del evento, escanea el QR y responde las preguntas para ganar semillas
        </p>
      </div>

      <div style={styles.standsList}>
        {stands.map((stand) => (
          <div key={stand.code} style={{
            ...styles.standItem,
            opacity: isCompleted(stand.code) ? 0.5 : 1,
          }}>
            <div style={styles.standInfo}>
              <span style={styles.standIcon}>
                {isCompleted(stand.code) ? '✅' : '🔍'}
              </span>
              <span style={styles.standTitle}>{stand.title}</span>
            </div>
            {isCompleted(stand.code) ? (
              <span style={styles.completedTag}>Completado</span>
            ) : (
              <button
                style={styles.scanButton}
                onClick={() => onScanQR(stand.code)}
              >
                Escanear QR
              </button>
            )}
          </div>
        ))}
      </div>

      {progress?.finished && (
        <button style={styles.finishButton} onClick={() => onScanQR('finish')}>
          Ver resultado final
        </button>
      )}
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '2rem 1.5rem',
    background: 'linear-gradient(180deg, #1a3a2a 0%, #0f2318 100%)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  greeting: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '1rem',
  },
  seedsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  },
  tree: {
    transition: 'all 0.3s',
  },
  points: {
    color: '#a8d5b5',
    fontSize: '1rem',
  },
  card: {
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '1rem 1.5rem',
    marginBottom: '1.5rem',
  },
  instructions: {
    color: '#a8d5b5',
    textAlign: 'center',
    fontSize: '0.9rem',
    lineHeight: '1.5',
  },
  standsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  standItem: {
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '1rem 1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  standInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
  },
  standIcon: {
    fontSize: '1.3rem',
  },
  standTitle: {
    color: '#ffffff',
    fontSize: '0.95rem',
  },
  completedTag: {
    color: '#a8d5b5',
    fontSize: '0.8rem',
  },
  scanButton: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: 'none',
    background: '#2d6a4f',
    color: '#ffffff',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  finishButton: {
    marginTop: '2rem',
    width: '100%',
    padding: '1rem',
    borderRadius: '12px',
    border: 'none',
    background: '#2d6a4f',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}