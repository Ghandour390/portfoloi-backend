import { IContext } from '../../../shared/types';
import { AuthenticationError } from 'apollo-server-express';
import { requireAuth, requireRole, UserRole } from '../../../shared/auth';

export const userResolvers = {

  Query: {
    user: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      requireAuth(user);
      return services.userService.getUserById(id);
    },
    users: async (_: any, __: any, { user, services }: IContext) => {
      requireRole(user, [UserRole.ADMIN]);
      return services.userService.getAllUsers();
    },
    me: async (_: any, __: any, { user, services }: IContext) => {
      requireAuth(user);
      if (!user) {
        throw new AuthenticationError('You must be logged in.');
      }
      return services.userService.getUserById(user.id);
    },
  },


  Mutation: {
    createUser: async (_: any, { input }: { input: any }, { services }: IContext) => {
      const user = await services.userService.createUser(input);
      const { accessToken, refreshToken } = await services.userService.loginUser(input.email, input.password);
      return { accessToken, refreshToken, user };
    },
    login: async (_: any, { input }: { input: { email: string; password: string } }, { services }: IContext) => {
      return services.userService.loginUser(input.email, input.password);
    },
    refreshToken: async (_: any, { token }: { token: string }, { services }: IContext) => {
      return services.userService.refreshAccessToken(token);
    },
    updateUser: async (_: any, { id, input }: { id: string; input: any }, { user, services }: IContext) => {
      requireAuth(user);
      // Only admin or the user themselves can update
      if (user!.role !== UserRole.ADMIN && user!.id !== id) {
        throw new AuthenticationError('Not authorized to update this user');
      }
      return services.userService.updateUser(id, input);
    },
    deleteUser: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      requireRole(user, [UserRole.ADMIN]);
      return services.userService.deleteUser(id);
    },
  },
};