import { useEffect, useState } from 'react'
import { getStand, submitAnswers } from '../services/api'

export default function Quiz({ player, standCode, onResult }) {
  const [stand, setStand] = useState(null)
  const [selected, setSelected] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchStand = async () => {
      try {
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

  const handleSelect = (questionId, optionId) => {
    setSelected((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const allAnswered = stand?.questions?.every((q) => selected[q.id])

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const answers = Object.entries(selected).map(([questionId, optionId]) => ({
        questionId,
        optionId,
      }))
      const res = await submitAnswers({
        playerId: player.id,
        standCode,
        answers,
      })
      onResult(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div style={styles.center}>
      <p style={styles.loadingText}>Cargando preguntas...</p>
    </div>
  )

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>{stand?.title}</h2>
        <p style={styles.subtitle}>{stand?.description}</p>
      </div>

      <div style={styles.questions}>
        {stand?.questions?.map((question, qi) => (
          <div key={question.id} style={styles.questionCard}>
            <p style={styles.questionText}>
              {qi + 1}. {question.text}
            </p>
            <div style={styles.options}>
              {question.options.map((option) => (
                <button
                  key={option.id}
                  style={{
                    ...styles.option,
                    ...(selected[question.id] === option.id ? styles.optionSelected : {}),
                  }}
                  onClick={() => handleSelect(question.id, option.id)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        style={{
          ...styles.submitButton,
          opacity: allAnswered ? 1 : 0.5,
        }}
        onClick={handleSubmit}
        disabled={!allAnswered || submitting}
      >
        {submitting ? 'Enviando...' : 'Enviar respuestas'}
      </button>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '2rem 1.5rem',
    background: 'linear-gradient(180deg, #1a3a2a 0%, #0f2318 100%)',
  },
  center: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(180deg, #1a3a2a 0%, #0f2318 100%)',
  },
  loadingText: {
    color: '#a8d5b5',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#a8d5b5',
    fontSize: '0.9rem',
  },
  questions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  questionCard: {
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '1.2rem',
  },
  questionText: {
    color: '#ffffff',
    fontSize: '1rem',
    marginBottom: '1rem',
    lineHeight: '1.5',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  option: {
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    border: '2px solid #2d6a4f',
    background: 'rgba(255,255,255,0.05)',
    color: '#ffffff',
    fontSize: '0.9rem',
    cursor: 'pointer',
    textAlign: 'left',
  },
  optionSelected: {
    background: '#2d6a4f',
    border: '2px solid #52b788',
  },
  submitButton: {
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