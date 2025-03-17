import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 新しいユーザーを作成
  const newUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'テストユーザー',
    },
  })
  console.log('新しいユーザーが作成されました:', newUser)

  // 全ユーザーを取得
  const allUsers = await prisma.user.findMany()
  console.log('全ユーザー:', allUsers)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
