import type { CollectionConfig } from 'payload'

export const Specialties: CollectionConfig = {
  slug: 'specialties',
  auth: false,
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
