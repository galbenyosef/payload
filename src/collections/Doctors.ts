import {
  CollectionConfig,
  CollectionBeforeChangeHook,
  CollectionBeforeReadHook,
  CollectionAfterChangeHook,
} from 'payload'

const BeforeChangeHook: CollectionBeforeChangeHook = async ({
  originalDoc,
  req, // incoming data to update or create with
}) => {
  const specialty = await req.payload.findByID({
    collection: 'specialties',
    id: originalDoc.specialtyId,
  })
  const image =
    originalDoc.image &&
    (await req.payload.findByID({ collection: 'media', id: originalDoc.image }))

  return {
    ...originalDoc,
    specialty: specialty.name,
    ...(image && { imageUrl: image.url }),
    profileLink: `/${originalDoc.name}-${originalDoc.id}`,
  }
}

export const Doctors: CollectionConfig = {
  slug: 'doctors',
  auth: false,
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [BeforeChangeHook],
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
