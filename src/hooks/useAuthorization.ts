import { useMemo } from 'react'

import { Permission, ROLE_PERMISSIONS, Role } from '@/types/roles'

export function getPermissionsForRoles(roles: Role[]) {
  const permissions = new Set<Permission>()
  roles.forEach((role) => {
    const list = ROLE_PERMISSIONS[role]
    if (list) {
      list.forEach((permission) => permissions.add(permission))
    }
  })
  return permissions
}

export type UseAuthorizationResult = {
  canViewDashboard: boolean
  canManageProducts: boolean
  canManageOrders: boolean
  canViewAnalytics: boolean
  canManageTvSlides: boolean
  canEditSettings: boolean
  canManageCustomers: boolean
  canManagePromotions: boolean
  canAccessCatalog: boolean
  canProcessPayments: boolean
  canAccessCheckout: boolean
  hasRole: (role: Role) => boolean
  hasPermission: (permission: Permission) => boolean
}

export function useAuthorization(defaultRoles: Role[] = []): UseAuthorizationResult {
  const permissions = useMemo(() => getPermissionsForRoles(defaultRoles), [defaultRoles])
  const hasPermission = (permission: Permission) => permissions.has(permission)

  return {
    canViewDashboard: hasPermission(Permission.VIEW_DASHBOARD),
    canManageProducts: hasPermission(Permission.MANAGE_PRODUCTS),
    canManageOrders: hasPermission(Permission.MANAGE_ORDERS),
    canViewAnalytics: hasPermission(Permission.VIEW_ANALYTICS),
    canManageTvSlides: hasPermission(Permission.MANAGE_TV_SLIDES),
    canEditSettings: hasPermission(Permission.EDIT_SETTINGS),
    canManageCustomers: hasPermission(Permission.MANAGE_CUSTOMERS),
    canManagePromotions: hasPermission(Permission.MANAGE_PROMOTIONS),
    canAccessCatalog: hasPermission(Permission.ACCESS_CATALOG),
    canProcessPayments: hasPermission(Permission.PROCESS_PAYMENTS),
    canAccessCheckout: hasPermission(Permission.ACCESS_CHECKOUT),
    hasRole: (role: Role) => defaultRoles.includes(role),
    hasPermission,
  }
}
