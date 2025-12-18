import { Role, Permission, ROLE_PERMISSIONS } from '@/types/roles'

export function useAuthorization(role: Role) {
  const permissions = ROLE_PERMISSIONS[role] ?? []
  return {
    role,
    permissions,
    can: (permission: Permission) => permissions.includes(permission),
  }
}
