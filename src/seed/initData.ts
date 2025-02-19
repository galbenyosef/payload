import { Specialty, User } from '@/payload-types'
import { generateBasicSpecialties } from './generateMockSpecialities'
export const initSpecialties: Specialty[] = generateBasicSpecialties()

export const initUsers: User[] = [
  {
    id: 1,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    name: 'Admin',
    email: 'galbenyosef@gmail.com',
    roles: ['admin'],
    password: process.env.ADMIN_PASSWORD,
  },
  ...Array.from({ length: 20 }, (_, i) => {
    const roles = Array.from(
      new Set(
        Array.from(
          { length: 2 },
          () => (['expert', 'client'] as const)[Math.floor(Math.random() * 2)],
        ),
      ),
    )
    return {
      id: i + 2,
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      name: `User${i + 1}`,
      email: `user${i + 1}@example.com`,
      roles,
      ...(roles.includes('expert')
        ? {
            specialty: { ...initSpecialties[Math.floor(Math.random() * 2)] },
          }
        : {}),
      password: process.env.ADMIN_PASSWORD,
    }
  }),
]
