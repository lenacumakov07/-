import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Роуты
import usersRouter from './routes/users'
import placesRouter from './routes/places'
import scheduleRouter from './routes/schedule'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Маршруты
app.use('/api/users', usersRouter)
app.use('/api/places', placesRouter)
app.use('/api/schedule', scheduleRouter)

// Тестовый маршрут
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Campus Navigator API работает! 🚀',
    endpoints: {
      users: 'GET /api/users',
      places: 'GET /api/places',
      schedule: 'GET /api/schedule/group/{group}',
      documentation: 'Документация в процессе...'
    }
  })
})

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`)
  console.log(`📚 API доступно по: http://localhost:${PORT}/api`)
})
