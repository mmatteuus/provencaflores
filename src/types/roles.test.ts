import { describe, expect, it } from 'vitest'

import { Permission, ROLE_PERMISSIONS, Role, ROLE_PERMISSIONS_LIST } from './roles'

describe('role definitions', () => {
  it('exposes every role permission mapping', () => {
    expect(ROLE_PERMISSIONS_LIST).toHaveLength(Object.keys(Role).length)
  })

  it('admin contains dashboard and management permissions', () => {
    const adminPermissions = ROLE_PERMISSIONS[Role.ADMIN]
    expect(adminPermissions).toContain(Permission.VIEW_DASHBOARD)
    expect(adminPermissions).toContain(Permission.MANAGE_PRODUCTS)
    expect(adminPermissions).toContain(Permission.MANAGE_PROMOTIONS)
  })

  it('clients can access catalog but not edit items', () => {
    const clientPermissions = ROLE_PERMISSIONS[Role.CLIENT]
    expect(clientPermissions).toContain(Permission.ACCESS_CATALOG)
    expect(clientPermissions).not.toContain(Permission.MANAGE_PRODUCTS)
  })
})
