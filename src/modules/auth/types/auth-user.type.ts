import type { Role } from '../../../common/enums/role.enum';

/**
 * Represents the authenticated user object attached to the request
 * by the JwtStrategy's validate() method.
 *
 * This is NOT the raw JWT payload — it's the transformed user data
 * returned by validate() after looking up the user in the database.
 */
export interface AuthUser {
  id: string;
  email: string;
  role: Role;
}
