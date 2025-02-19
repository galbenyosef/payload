import type { Access, FieldAccess } from 'payload'
import type { User } from '../payload-types'

export const checkRole = (allRoles: User['roles'] = [], user: User | null): boolean => {
  if (user && allRoles) {
    if (
      allRoles.some((role) => {
        return user?.roles?.some((individualRole) => {
          return individualRole === role
        })
      })
    ) {
      return true
    }
  }

  return false
}
export const isAdmin: FieldAccess = ({ req: { user } }) => {
  if (user) {
    return checkRole(['admin'], user)
  }
  return false
}

export const anyone: FieldAccess = () => true

export const hasRole: Access = async ({ req }, roles?: User['roles']) => {
  if (!req.user || !roles) return false
  return checkRole(roles, req.user)
}

export const isSameUser: Access = async ({ req, id }) => {
  if (!req.user || !id || typeof id !== 'string') return false
  return req.user.id.toString() === id
}

export const isAdminOrSelf: Access = async ({ req: { user }, id }) => {
  if (!user) return false
  if (checkRole(['admin'], user)) {
    return true
  }
  return user.id.toString() === id?.toString()
}
