// eslint-disable-next-line import/no-extraneous-dependencies
import {
  auth,
  claimCheck,
  InsufficientScopeError,
} from 'express-oauth2-jwt-bearer';
import type { TRequestResponseNextFunction } from '../types';

const validateAccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  audience: process.env.AUTH0_AUDIENCE,
});

const checkRequiredPermissions = (requiredPermissions: []) => {
  return ({ request, response, next }: TRequestResponseNextFunction) => {
    const permissionCheck = claimCheck((payload) => {
      const permissions = payload.permissions || [];

      const hasPermissions = requiredPermissions.every(
        ({ requiredPermission }: { requiredPermission: string }) =>
          // @ts-ignore
          permissions.includes(requiredPermission)
      );

      if (!hasPermissions) {
        throw new InsufficientScopeError();
      }

      return hasPermissions;
    });

    permissionCheck(request, response, next!);
  };
};

export { validateAccessToken, checkRequiredPermissions };
