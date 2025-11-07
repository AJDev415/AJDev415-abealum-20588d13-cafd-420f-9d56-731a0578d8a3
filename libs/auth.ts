// Shared RBAC utilities for checking user roles
export const isAdminOrManager = (role: string) => role === 'admin' || role === 'manager';