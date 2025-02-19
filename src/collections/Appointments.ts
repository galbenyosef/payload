import type { CollectionConfig } from 'payload'

export const Appointments: CollectionConfig = {
  slug: 'appointments',
  auth: false,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'expert',
      type: 'relationship',
      required: true,
      relationTo: 'users',
      unique: true,
      filterOptions: ({ relationTo, siblingData, user }) => {
        return {
          roles: {
            in: ['expert'],
          },
        }
      },
    },
    {
      name: 'client',
      type: 'relationship',
      required: true,
      relationTo: 'users',
      unique: true,
      filterOptions: ({ relationTo, siblingData, user }) => {
        return {
          roles: {
            in: ['client'],
          },
        }
      },
    },
  ],
}
