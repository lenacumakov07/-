import { PrismaClient } from '@prisma/client'

// Создаем экземпляр Prisma Client
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

// Экспортируем для использования в других файлах
export default prisma

// Функция для безопасного закрытия соединения
export async function disconnectPrisma() {
  await prisma.$disconnect()
}

// Функция для подключения
export async function connectPrisma() {
  await prisma.$connect()
}
