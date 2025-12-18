export enum Role {
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
  VENDOR = 'vendor',
  CLIENT = 'client',
}

export enum Permission {
  VIEW_DASHBOARD = 'view:dashboard',
  MANAGE_PRODUCTS = 'manage:products',
  MANAGE_ORDERS = 'manage:orders',
  VIEW_ANALYTICS = 'view:analytics',
  MANAGE_TV_SLIDES = 'manage:tv-slides',
  EDIT_SETTINGS = 'edit:settings',
  MANAGE_CUSTOMERS = 'manage:customers',
  MANAGE_PROMOTIONS = 'manage:promotions',
  ACCESS_CATALOG = 'view:catalog',
  PROCESS_PAYMENTS = 'process:payments',
  ACCESS_CHECKOUT = 'access:checkout',
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
    Permission.ACCESS_CATALOG,
    Permission.PROCESS_PAYMENTS,
    Permission.ACCESS_CHECKOUT,
  ],
  [Role.SUPERVISOR]: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_CUSTOMERS,
    Permission.ACCESS_CATALOG,
    Permission.ACCESS_CHECKOUT,
  ],
  [Role.VENDOR]: [
    Permission.ACCESS_CATALOG,
    Permission.PROCESS_PAYMENTS,
    Permission.ACCESS_CHECKOUT,
  ],
  [Role.CLIENT]: [Permission.ACCESS_CATALOG, Permission.ACCESS_CHECKOUT],
}

export const ROLE_PERMISSIONS_LIST: RolePermissions[] = Object.entries(ROLE_PERMISSIONS).map(([role, permissions]) => ({
  role: role as Role,
  permissions,
}))
