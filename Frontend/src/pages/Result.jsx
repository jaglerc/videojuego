export default function Result({ result, onContinue }) {
  const { correctAnswers, seedEarned, message } = result

  return (
    <div style={styles.container}>
      <div style={styles.iconContainer}>
        <span style={styles.icon}>{seedEarned ? '🌰' : '😔'}</span>
      </div>

      <h1 style={styles.title}>
        {seedEarned ? '¡BIEN!' : '¡Sigue intentando!'}
      </h1>

      <p style={styles.message}>{message}</p>

      <div style={styles.card}>
        <p style={styles.cardText}>
          Respondiste correctamente {correctAnswers} de 3 preguntas
        </p>
        {seedEarned && (
          <div style={styles.seedRow}>
            <span style={styles.seedIcon}>🌰</span>
            <p style={styles.seedText}>Tienes 1 semilla nueva</p>
          </div>
        )}
      </div>

      <button style={styles.button} onClick={onContinue}>
        ¿Seguimos?
      </button>

      <div style={styles.footer}>
        <span style={styles.footerLogo}>⚜️</span>
        <p style={styles.footerText}>Scouts de Colombia</p>
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
    padding: '2rem 1.5rem',
    background: 'linear-gradient(180deg, #1a3a2a 0%, #0f2318 100%)',
  },
  iconContainer: {
    marginBottom: '1rem',
  },
  icon: {
    fontSize: '5rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  message: {
    color: '#a8d5b5',
    textAlign: 'center',
    fontSize: '1rem',
    marginBottom: '2rem',
    lineHeight: '1.5',
  },
  card: {
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '360px',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  cardText: {
    color: '#ffffff',
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  seedRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  seedIcon: {
    fontSize: '1.5rem',
  },
  seedText: {
    color: '#a8d5b5',
    fontSize: '0.95rem',
  },
  button: {
    padding: '1rem 3rem',
    borderRadius: '12px',
    border: 'none',
    background: '#2d6a4f',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '3rem',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.3rem',
  },
  footerLogo: {
    fontSize: '2rem',
  },
  footerText: {
    color: '#a8d5b5',
    fontSize: '0.85rem',
  },
}