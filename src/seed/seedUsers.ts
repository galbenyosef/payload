import { Payload } from 'payload'
import { initUsers } from './initData'
import { User } from '@/payload-types'

const seedUser = async (payload: Payload) => {
  await payload.delete({
    collection: 'users',
    where: { id: { exists: true } },
  })

  await payload.delete({
    collection: 'specialties',
    where: { id: { exists: true } },
  })

  const users = await initUsers(payload)
  users.map((user) => payload.create({ collection: 'users', data: user }))
}

export default seedUser
