import { IUser } from '../model/user.model';
import { IUserRepository } from '../repository/user.repository.interface';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const existingUser = await this.userRepository.findByEmail(userData.email!);
    if (existingUser) {
      throw new Error('User already exists');
    }
    return this.userRepository.create(userData);
  }

  async loginUser(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: IUser }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    const isValid = await (user as any).comparePassword(password);
    if (!isValid) {
      throw new AuthenticationError('Invalid credentials');
    }

    // user model interface does not include `id` property (mongoose provides `_id`)
    const userId = (user as any)._id || (user as any).id;

    const accessSecret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
    const accessExpires = (process.env.ACCESS_TOKEN_EXPIRES || process.env.JWT_EXPIRATION || '15m') as string;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET;
    const refreshExpires = (process.env.REFRESH_TOKEN_EXPIRES || '7d') as string;

    const accessToken = (jwt as any).sign(
      { id: userId, email: user.email, role: user.role, type: 'access' },
      accessSecret as string,
      { expiresIn: accessExpires }
    );

    const refreshToken = (jwt as any).sign(
      { id: userId, email: user.email, role: user.role, type: 'refresh' },
      refreshSecret as string,
      { expiresIn: refreshExpires }
    );

    return { accessToken, refreshToken, user };
  }

  async updateUser(id: string, userData: Partial<IUser>): Promise<IUser> {
    const updatedUser = await this.userRepository.update(id, userData);
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string; user: IUser }> {
    try {
      const refreshSecret = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET;
      const payload = (jwt as any).verify(refreshToken, refreshSecret as string) as any;
      const userId = payload.id;
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      const accessSecret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
      const accessExpires = (process.env.ACCESS_TOKEN_EXPIRES || process.env.JWT_EXPIRATION || '15m') as string;

      const newAccessToken = (jwt as any).sign(
        { id: (user as any)._id || userId, email: user.email, role: user.role, type: 'access' },
        accessSecret as string,
        { expiresIn: accessExpires }
      );

      // Optionally rotate refresh token (simple approach: reissue a new one)
      const refreshExpires = (process.env.REFRESH_TOKEN_EXPIRES || '7d') as string;
      const newRefreshToken = (jwt as any).sign(
        { id: (user as any)._id || userId, email: user.email, role: user.role, type: 'refresh' },
        refreshSecret as string,
        { expiresIn: refreshExpires }
      );

      return { accessToken: newAccessToken, refreshToken: newRefreshToken, user };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('refreshAccessToken error:', e);
      throw new AuthenticationError('Invalid/Expired refresh token');
    }
  }
}