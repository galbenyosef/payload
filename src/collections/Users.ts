import { loginAfterCreate } from './hooks/loginAfterCreate'
import type { CollectionConfig, PayloadRequest } from 'payload'
import type { User } from '../payload-types'
import { anyone, checkRole, isAdmin, isAdminOrSelf } from '../access/roles'
import { protectRoles } from './hooks/protectRoles'

type EmailTemplateArgs = {
  req?: PayloadRequest
  token?: string
  user?: User
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: false, // Disable email verification
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 minutes
    useAPIKey: true,
    depth: 2,
    forgotPassword: {
      generateEmailHTML: ({ token }: EmailTemplateArgs = { token: '' }) => {
        return `Reset your password using this token: ${token}`
      },
    },
  },
  admin: {
    useAsTitle: 'email',
    group: 'System',
    defaultColumns: ['name', 'email', 'roles', 'specialty'],
    description: 'Users of the platform',
    listSearchableFields: ['email', 'name'],
    pagination: {
      defaultLimit: 10,
      limits: [10, 20, 50, 100],
    },
  },
  access: {
    read: anyone,
    create: anyone,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    // Authentication Fields
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'resetPasswordToken',
      type: 'text',
      hidden: true,
      admin: {
        disabled: true,
      },
    },
    {
      name: 'resetPasswordExpiration',
      type: 'date',
      hidden: true,
      admin: {
        disabled: true,
      },
    },
    {
      name: 'loginAttempts',
      type: 'number',
      hidden: true,
      admin: {
        disabled: true,
      },
    },
    {
      name: 'lockUntil',
      type: 'date',
      hidden: true,
      admin: {
        disabled: true,
      },
    },

    // Profile Fields
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the user',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Maximum size: 4MB. Accepted formats: .jpg, .jpeg, .png, .gif',
      },
    },

    // Role & Access Fields
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      access: {
        create: isAdmin,
        update: isAdmin,
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Expert',
          value: 'expert',
        },
        {
          label: 'Client',
          value: 'client',
        },
      ],
      admin: {
        description: 'User role determines permissions',
      },
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier for the tenant',
        condition: (data, siblingData, { user }) => checkRole(['expert'], user),
      },
    },
    {
      name: 'specialty',
      type: 'relationship',
      required: true,
      relationTo: 'specialties',
      admin: {
        condition: (data, siblingData, { user }) => checkRole(['expert'], user),
      },
    },

    {
      name: 'lastActive',
      type: 'date',
      admin: {
        description: 'Last time user was active',
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeValidate: [],
    beforeChange: [
      ({ data }) => {
        // Update lastActive timestamp
        data.lastActive = new Date().toISOString()
        return data
      },
    ],
    afterChange: [loginAfterCreate],
  },
}
