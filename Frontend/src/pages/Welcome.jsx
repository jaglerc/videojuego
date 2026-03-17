import { useState } from 'react'
import { createPlayer } from '../services/api'

export default function Welcome({ onStart }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    if (!name.trim()) return
    setLoading(true)
    try {
      const res = await createPlayer(name)
      onStart(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.logo}>⚜️</div>
      <h1 style={styles.title}>Scouts de Colombia</h1>
      <p style={styles.subtitle}>Sal al bosque y captura semillas</p>
      <div style={styles.card}>
        <p style={styles.label}>¿Cuál es tu nombre?</p>
        <input
          style={styles.input}
          placeholder="Escribe tu nombre..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
        />
        <button
          style={styles.button}
          onClick={handleStart}
          disabled={loading || !name.trim()}
        >
          {loading ? 'Cargando...' : '¡Comenzar!'}
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: 'linear-gradient(180deg, #1a3a2a 0%, #0f2318 100%)',
  },
  logo: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  subtitle: {
    color: '#a8d5b5',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  card: {
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '2rem',
    width: '100%',
    maxWidth: '360px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    color: '#a8d5b5',
    fontSize: '1rem',
    textAlign: 'center',
  },
  input: {
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    border: '2px solid #2d6a4f',
    background: 'rgba(255,255,255,0.1)',
    color: '#ffffff',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    padding: '0.9rem',
    borderRadius: '8px',
    border: 'none',
    background: '#2d6a4f',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}