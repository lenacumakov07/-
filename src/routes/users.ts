import { Router } from 'express'
import prisma from '../prisma'

const router = Router()

// Получить всех пользователей
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      take: 50 // ограничиваем 50 записями
    })
    
    res.json({
      success: true,
      count: users.length,
      data: users
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      error: 'Ошибка при получении пользователей'
    })
  }
})

// Создать пользователя
router.post('/', async (req, res) => {
  try {
    const { email, username, name, role, group, position } = req.body
    
    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        role: role || 'STUDENT',
        group,
        position
      }
    })
    
    res.json({
      success: true,
      data: user,
      message: 'Пользователь создан'
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Ошибка при создании пользователя'
    })
  }
})

// Получить пользователя по ID
router.get('/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id }
    })
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Пользователь не найден'
      })
    }
    
    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка при получении пользователя'
    })
  }
})

export default router
