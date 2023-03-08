/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import {
  InvalidTokenError,
  UnauthorizedError,
  InsufficientScopeError,
} from 'express-oauth2-jwt-bearer';

const errorHandler = (
  error: ErrorRequestHandler,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error instanceof InsufficientScopeError) {
    const message = 'Permission denied';

    response.status(error.status).json({ message });

    return;
  }

  if (error instanceof InvalidTokenError) {
    const message = 'Bad credentials';

    response.status(error.status).json({ message });

    return;
  }

  if (error instanceof UnauthorizedError) {
    const message = 'Requires authentication';

    response.status(error.status).json({ message });

    return;
  }

  const status = 500;
  const message = 'Internal Server Error';
  // eslint-disable-next-line no-console
  console.log(error);
  response.status(status).json({ message });
};

export default errorHandler;
