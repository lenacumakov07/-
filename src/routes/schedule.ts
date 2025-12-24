import { Router } from 'express'
import prisma from '../prisma'

const router = Router()

// Получить расписание для группы
router.get('/group/:group', async (req, res) => {
  try {
    const schedule = await prisma.scheduleItem.findMany({
      where: { group: req.params.group },
      include: {
        place: {
          include: {
            building: true,
            floor: true
          }
        },
        teacher: true
      },
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' }
      ]
    })
    
    res.json({
      success: true,
      count: schedule.length,
      data: schedule
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      error: 'Ошибка при получении расписания'
    })
  }
})

// Получить расписание для преподавателя
router.get('/teacher/:teacherId', async (req, res) => {
  try {
    const schedule = await prisma.scheduleItem.findMany({
      where: { teacherId: req.params.teacherId },
      include: {
        place: {
          include: {
            building: true,
            floor: true
          }
        }
      },
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' }
      ]
    })
    
    res.json({
      success: true,
      count: schedule.length,
      data: schedule
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка при получении расписания'
    })
  }
})

export default router
