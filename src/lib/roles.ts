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

/** Returns the list of manual slugs a role can access */
export function getAllowedManuals(role: UserRole | string | undefined): string[] {
  return ROLE_MANUALS[(role as UserRole)] || [];
}

/** Checks if a role can access a specific manual */
export function canAccessManual(role: UserRole | string | undefined, manualSlug: string): boolean {
  return getAllowedManuals(role).includes(manualSlug);
}
