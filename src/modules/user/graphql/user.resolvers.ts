import { IContext } from '../../../shared/types';
import { AuthenticationError } from 'apollo-server-express';

export const userResolvers = {

  Query: {
    user: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.userService.getUserById(id);
    },
    users: async (_: any, __: any, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.userService.getAllUsers();
    },
    me: async (_: any, __: any, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
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
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.userService.updateUser(id, input);
    },
    deleteUser: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.userService.deleteUser(id);
    },
  },
};