import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

export const createPlayer = (name) =>
  api.post('/player', { name })

export const getProgress = (playerId) =>
  api.get(`/player/${playerId}/progress`)

export const getStand = (code) =>
  api.get(`/stand/${code}`)

export const submitAnswers = (data) =>
  api.post('/quiz/submit', data)