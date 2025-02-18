import type { Access } from 'payload'

export const isAdmin: Access = ({ req }) => {
  return req.user?.role === 'admin'
}

export const anyone: Access = () => true

export const hasRole: Access = async ({ req }, role?: string) => {
  if (!req.user || !role) return false
  return req.user.role === role
}

export const isSameUser: Access = async ({ req, id }) => {
  if (!req.user || !id || typeof id !== 'string') return false
  return req.user.id.toString() === id
}

export const isAdminOrSelf: Access = async ({ req, id }) => {
  if (!req.user) return false
  if (req.user.role === 'admin') return true
  return req.user.id.toString() === id?.toString()
}
