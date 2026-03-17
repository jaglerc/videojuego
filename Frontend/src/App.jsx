import { useState } from 'react'
import Welcome from './pages/Welcome'
import Forest from './pages/Forest'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import Final from './pages/Final'

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [player, setPlayer] = useState(null)
  const [progress, setProgress] = useState(null)
  const [currentStand, setCurrentStand] = useState(null)
  const [result, setResult] = useState(null)

  const handleStart = (playerData) => {
    setPlayer(playerData)
    setScreen('forest')
  }

  const handleScanQR = (standCode) => {
    if (standCode === 'finish') {
      setScreen('final')
      return
    }
    setCurrentStand(standCode)
    setScreen('quiz')
  }

  const handleResult = (resultData) => {
    setResult(resultData)
    setScreen('result')
  }

  const handleContinue = async () => {
    const { getProgress } = await import('./services/api')
    const res = await getProgress(player.id)
    setProgress(res.data)
    if (res.data.finished) {
      setScreen('final')
    } else {
      setScreen('forest')
    }
  }

  return (
    <>
      {screen === 'welcome' && (
        <Welcome onStart={handleStart} />
      )}
      {screen === 'forest' && (
        <Forest
          player={player}
          onScanQR={handleScanQR}
        />
      )}
      {screen === 'quiz' && (
        <Quiz
          player={player}
          standCode={currentStand}
          onResult={handleResult}
        />
      )}
      {screen === 'result' && (
        <Result
          result={result}
          onContinue={handleContinue}
        />
      )}
      {screen === 'final' && (
        <Final
          player={player}
          progress={progress}
        />
      )}
    </>
  )
}