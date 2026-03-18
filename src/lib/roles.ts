/**
 * Role-based access control for manuals.
 */

export type UserRole = 'setter' | 'closer' | 'admin';

/** Which manuals each role can access */
const ROLE_MANUALS: Record<UserRole, string[]> = {
  setter: ['setter-manual'],
  closer: ['closer-manual', 'builder-playbook'],
  admin: ['setter-manual', 'closer-manual', 'builder-playbook'],
};

/** Returns the list of manual slugs a role can access.
 *  Falls back to admin if role is missing (e.g. pre-existing JWT without role). */
export function getAllowedManuals(role: UserRole | string | undefined): string[] {
  if (!role) return ROLE_MANUALS.admin;
  return ROLE_MANUALS[(role as UserRole)] || ROLE_MANUALS.admin;
}

/** Checks if a role can access a specific manual */
export function canAccessManual(role: UserRole | string | undefined, manualSlug: string): boolean {
  return getAllowedManuals(role).includes(manualSlug);
}
