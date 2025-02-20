import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, Payload } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Specialties } from './collections/Specialties'
import seedUser from './seed/seedUsers'
import { Appointments } from './collections/Appointments'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Specialties, Appointments],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    nestedDocsPlugin({
      collections: ['specialties'],
    }),
  ],

  onInit: async (payload: Payload) => {
    try {
      const hasAdmins = await payload.find({
        collection: 'users',
        limit: 1,
      })

      if (hasAdmins.docs.length === 0) {
        console.log('Starting initialization process...')

        console.log('Creating users...')
        await seedUser(payload)

        console.log('Setup complete')
      } else {
        console.log('Initialization already completed. Skipping setup.')
      }
    } catch (error) {
      console.error('Error during initialization:')
      console.error(JSON.stringify(error, null, 2))
    }
  },
})
