import { Router } from 'express'
import prisma from '../prisma'

const router = Router()

// Получить все места
router.get('/', async (req, res) => {
  try {
    const places = await prisma.place.findMany({
      include: {
        building: true,
        floor: true
      },
      take: 100
    })
    
    res.json({
      success: true,
      count: places.length,
      data: places
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      error: 'Ошибка при получении мест'
    })
  }
})

// Получить места по типу
router.get('/type/:type', async (req, res) => {
  try {
    const places = await prisma.place.findMany({
      where: { type: req.params.type },
      include: {
        building: true,
        floor: true
      }
    })
    
    res.json({
      success: true,
      count: places.length,
      data: places
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка при получении мест'
    })
  }
})

// Поиск мест по названию
router.get('/search/:query', async (req, res) => {
  try {
    const places = await prisma.place.findMany({
      where: {
        name: {
          contains: req.params.query,
          mode: 'insensitive'
        }
      },
      include: {
        building: true,
        floor: true
      },
      take: 20
    })
    
    res.json({
      success: true,
      count: places.length,
      data: places
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка при поиске'
    })
  }
})

export default router
