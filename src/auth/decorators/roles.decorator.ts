// Custom Roles Decorator: This decorator is used to define required roles for each route.
// You can pass one or more roles to this decorator.

import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
