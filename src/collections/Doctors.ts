import { isAdmin } from '@/access/roles'
import { CollectionConfig, CollectionBeforeChangeHook, CollectionAfterReadHook } from 'payload'

const BeforeChangeHook: CollectionBeforeChangeHook = async ({
  data,
  req, // incoming data to update or create with
}) => {
  const specialty = await req.payload.findByID({
    collection: 'specialties',
    id: data.specialtyId,
  })
  const image = data.image && (await req.payload.findByID({ collection: 'media', id: data.image }))

  return {
    ...data,
    specialty: specialty.name,
    ...(image && { imageUrl: image.url }),
    profileLink: `/doctors/${data.slug}`,
  }
}

export const Doctors: CollectionConfig = {
  slug: 'doctors',
  auth: false,
  access: {
    read: () => true,
  },
  hooks: {
    afterRead: [
      ({ doc, req: { user } }) => {
        doc.specialty = doc.specialtyId.name
        doc.profileLink = `/doctors/${doc.slug}`

        if (user?.role === 'admin') {
          return doc
        }
        return { ...doc, specialtyId: undefined }
      },
    ],
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier for the tenant',
      },
    },
    {
      label: 'Specialty',
      name: 'specialtyId',
      type: 'relationship',
      required: true,
      relationTo: 'specialties',
    },
    {
      name: 'specialty',
      type: 'text',
      admin: {
        disabled: true,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          hasMany: false,
        },
        {
          name: 'imageUrl',
          defaultValue: '/assets/img/team_1.jpg',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'profileLink',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      label: 'Facebook URL',
      name: 'iconUrl',
      defaultValue: 'https://www.facebook.com/',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      label: 'Pinterest URL',
      name: 'iconUrl2',
      defaultValue: 'https://www.pinterest.com/',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      label: 'Twitter URL',
      name: 'iconUrl3',
      defaultValue: 'https://www.twitter.com/',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
}
