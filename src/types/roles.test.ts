import { describe, expect, it } from 'vitest'

import { Permission, ROLE_PERMISSIONS, Role, ROLE_PERMISSIONS_LIST } from './roles'

describe('role definitions', () => {
  it('defines the four canonical roles', () => {
    expect(ROLE_PERMISSIONS_LIST).toHaveLength(4)
    expect(Object.keys(ROLE_PERMISSIONS)).toEqual(Object.values(Role))
  })

  it('keeps ADMIN fully permissive', () => {
    const adminPermissions = ROLE_PERMISSIONS[Role.ADMIN]
    expect(adminPermissions).toContain(Permission.MANAGE_USERS)
    expect(adminPermissions).toContain(Permission.CREATE_TASK)
    expect(adminPermissions).toContain(Permission.RESOLVE_TICKET)
  })

  it('client role only sees catalog and checkout', () => {
    const clientPermissions = ROLE_PERMISSIONS[Role.CLIENT]
    expect(clientPermissions).toEqual([Permission.ACCESS_CATALOG, Permission.ACCESS_CHECKOUT])
  })
})
