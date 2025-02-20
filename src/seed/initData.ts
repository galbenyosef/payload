import { User } from '@/payload-types'
import { createHierarchicalSpecialties } from './generateMockSpecialities'
import { Payload } from 'payload'

export const initUsers: (payload: Payload) => Promise<User[]> = async (payload: Payload) => {
  await createHierarchicalSpecialties(payload)
  const specialties = await payload.find({
    collection: 'specialties',
  })

  return [
    {
      id: 1,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      name: 'Admin',
      email: 'galbenyosef@gmail.com',
      roles: ['admin'],
      password: process.env.ADMIN_PASSWORD,
    },
    ...Array.from({ length: 30 }, (_, i) => {
      const roles = Math.floor(Math.random() * 2) === 0 ? ['client'] : ['expert']
      return {
        id: i + 2,
        updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        name: `${roles[0]}${i + 1}`,
        email: `${roles[0]}${i + 1}@example.com`,
        roles,
        ...(roles.includes('expert')
          ? {
              specialty: {
                ...specialties.docs[Math.floor(Math.random() * specialties.docs.length)],
              },
            }
          : {}),
        password: process.env.ADMIN_PASSWORD,
      }
    }),
  ]
}
