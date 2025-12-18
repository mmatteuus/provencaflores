import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'

import { Role, Permission } from '@/types/roles'
import { getPermissionsForRoles, useAuthorization } from './useAuthorization'

describe('getPermissionsForRoles', () => {
  it('aggregates permissions from multiple roles', () => {
    const permissions = getPermissionsForRoles([Role.ADMIN, Role.CLIENT])
    expect(permissions.has(Permission.VIEW_DASHBOARD)).toBe(true)
    expect(permissions.has(Permission.ACCESS_CATALOG)).toBe(true)
  })
})

describe('useAuthorization', () => {
  it('exposes feature flags for admin', () => {
    const { result } = renderHook(() => useAuthorization([Role.ADMIN]))
    expect(result.current.canViewDashboard).toBe(true)
    expect(result.current.canManageProducts).toBe(true)
    expect(result.current.canManagePromotions).toBe(true)
    expect(result.current.canManageCustomers).toBe(true)
    expect(result.current.canAccessCheckout).toBe(true)
  })

  it('does not grant product permissions to client', () => {
    const { result } = renderHook(() => useAuthorization([Role.CLIENT]))
    expect(result.current.canManageProducts).toBe(false)
    expect(result.current.canAccessCatalog).toBe(true)
  })
})
