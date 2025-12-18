import { describe, expect, it } from 'vitest'

import { Permission, Role } from '@/types/roles'
import { useAuthorization } from './useAuthorization'
import { renderHook } from '@testing-library/react'

describe('useAuthorization', () => {
  it('allows admin to execute all critical perms', () => {
    const { result } = renderHook(() => useAuthorization(Role.ADMIN))
    expect(result.current.can(Permission.VIEW_DASHBOARD)).toBe(true)
    expect(result.current.can(Permission.CREATE_TASK)).toBe(true)
    expect(result.current.can(Permission.MANAGE_USERS)).toBe(true)
  })

  it('blocks sensitive operations for client', () => {
    const { result } = renderHook(() => useAuthorization(Role.CLIENT))
    expect(result.current.can(Permission.ACCESS_CATALOG)).toBe(true)
    expect(result.current.can(Permission.MANAGE_PRODUCTS)).toBe(false)
  })
})
