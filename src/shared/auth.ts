import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import { Request } from 'express';

export const verifyAccessToken = (req: Request) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return null;
  }

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
    const user = (jwt as any).verify(token, secret as string);
    return user as any;
  } catch (error) {
    // Log the verification error for debugging and satisfy linter (avoid unused catch param)
    // eslint-disable-next-line no-console
    console.error('JWT verification error:', error);
    throw new AuthenticationError('Invalid/Expired token');
  }
};

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    const secret = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET;
    const payload = (jwt as any).verify(refreshToken, secret as string);
    return payload as any;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Refresh token verification error:', error);
    throw new AuthenticationError('Invalid/Expired refresh token');
  }
};