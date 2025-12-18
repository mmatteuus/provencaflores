export enum Role {
  ADMIN = 'ADMIN',
  SUPERVISOR = 'SUPERVISOR',
  CLIENT = 'CLIENT',
  VISITOR = 'VISITOR',
}

export enum Permission {
  VIEW_DASHBOARD = 'VIEW_DASHBOARD',
  MANAGE_PRODUCTS = 'MANAGE_PRODUCTS',
  MANAGE_ORDERS = 'MANAGE_ORDERS',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  MANAGE_TV_SLIDES = 'MANAGE_TV_SLIDES',
  EDIT_SETTINGS = 'EDIT_SETTINGS',
  MANAGE_CUSTOMERS = 'MANAGE_CUSTOMERS',
  MANAGE_PROMOTIONS = 'MANAGE_PROMOTIONS',
  ACCESS_CATALOG = 'ACCESS_CATALOG',
  PROCESS_PAYMENTS = 'PROCESS_PAYMENTS',
  ACCESS_CHECKOUT = 'ACCESS_CHECKOUT',
  CREATE_TASK = 'CREATE_TASK',
  RESOLVE_TICKET = 'RESOLVE_TICKET',
  MANAGE_USERS = 'MANAGE_USERS',
}

export type RolePermissions = {
  role: Role
  permissions: Permission[]
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_PRODUCTS,
    Permission.MANAGE_ORDERS,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_TV_SLIDES,
    Permission.EDIT_SETTINGS,
    Permission.MANAGE_CUSTOMERS,
    Permission.MANAGE_PROMOTIONS,
    Permission.MANAGE_USERS,
    Permission.ACCESS_CATALOG,
    Permission.ACCESS_CHECKOUT,
    Permission.PROCESS_PAYMENTS,
    Permission.CREATE_TASK,
    Permission.RESOLVE_TICKET,
  ],
  [Role.SUPERVISOR]: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_CUSTOMERS,
    Permission.ACCESS_CATALOG,
    Permission.ACCESS_CHECKOUT,
    Permission.CREATE_TASK,
    Permission.RESOLVE_TICKET,
  ],
  [Role.CLIENT]: [Permission.ACCESS_CATALOG, Permission.ACCESS_CHECKOUT],
  [Role.VISITOR]: [],
}

export const ROLE_PERMISSIONS_LIST: RolePermissions[] = Object.entries(ROLE_PERMISSIONS).map(([role, permissions]) => ({
  role: role as Role,
  permissions,
}))
