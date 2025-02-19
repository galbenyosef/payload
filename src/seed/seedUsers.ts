import { Payload } from 'payload'
import { initSpecialties, initUsers } from './initData'

const seedUser = async (payload: Payload) => {
  await payload.delete({
    collection: 'users',
    where: { id: { exists: true } },
  })

  await payload.delete({
    collection: 'specialties',
    where: { id: { exists: true } },
  })

  await Promise.all([
    ...initSpecialties.map(
      async (specialty) =>
        await payload.create({
          collection: 'specialties',
          data: {
            ...specialty,
          },
        }),
    ),
    ...initUsers.map(
      async (user) =>
        await payload.create({
          collection: 'users',
          data: {
            ...user,
          },
        }),
    ),
  ])
}

export default seedUser
