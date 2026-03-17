export default function Final({ player, progress }) {
  const trees = progress?.seeds || 0
  const totalPoints = progress?.totalPoints || 0

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>¡Misión completada!</h1>

      <div style={styles.treesContainer}>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={styles.treeItem}>
            <span style={styles.treeIcon}>
              {i < trees ? '🌳' : '🌱'}
            </span>
            <p style={styles.treeLabel}>
              {i < trees ? 'Conseguido' : 'Pendiente'}
            </p>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <p style={styles.playerName}>{player?.name}</p>
        <div style={styles.statsRow}>
          <div style={styles.stat}>
            <span style={styles.statNumber}>{trees}</span>
            <span style={styles.statLabel}>Semillas</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.stat}>
            <span style={styles.statNumber}>{totalPoints}</span>
            <span style={styles.statLabel}>Puntos</span>
          </div>
        </div>
      </div>

      <div style={styles.standsList}>
        <p style={styles.standsTitle}>Stands visitados:</p>
        {progress?.completedStands?.map((stand) => (
          <div key={stand.standCode} style={styles.standItem}>
            <span style={styles.standIcon}>
              {stand.seedEarned ? '🌰' : '❌'}
            </span>
            <span style={styles.standTitle}>{stand.standTitle}</span>
            <span style={styles.standPoints}>
              {stand.correctAnswers} pts
            </span>
          </div>
        ))}
      </div>

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
    padding: '2rem 1.5rem',
    background: 'linear-gradient(180deg, #1a3a2a 0%, #0f2318 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  treesContainer: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  treeItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.3rem',
  },
  treeIcon: {
    fontSize: '3rem',
  },
  treeLabel: {
    color: '#a8d5b5',
    fontSize: '0.75rem',
  },
  card: {
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '360px',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  playerName: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.2rem',
  },
  statNumber: {
    color: '#ffffff',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#a8d5b5',
    fontSize: '0.85rem',
  },
  divider: {
    width: '1px',
    height: '40px',
    background: 'rgba(255,255,255,0.2)',
  },
  standsList: {
    width: '100%',
    maxWidth: '360px',
    marginBottom: '2rem',
  },
  standsTitle: {
    color: '#a8d5b5',
    fontSize: '0.9rem',
    marginBottom: '0.8rem',
  },
  standItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '0.8rem 1rem',
    marginBottom: '0.5rem',
  },
  standIcon: {
    fontSize: '1.2rem',
  },
  standTitle: {
    color: '#ffffff',
    fontSize: '0.9rem',
    flex: 1,
  },
  standPoints: {
    color: '#a8d5b5',
    fontSize: '0.85rem',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.3rem',
    marginTop: 'auto',
  },
  footerLogo: {
    fontSize: '2rem',
  },
  footerText: {
    color: '#a8d5b5',
    fontSize: '0.85rem',
  },
}