import { IContext } from '../../../shared/types';
import { AuthenticationError } from 'apollo-server-express';
import { Types } from 'mongoose';

export const socialNetworkResolvers = {
  Query: {
    socialNetwork: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.socialNetworkService.getSocialNetworkById(id);
    },
    userSocialNetworks: async (_: any, { userId }: { userId: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.socialNetworkService.getUserSocialNetworks(userId);
    },
  },
  Mutation: {
    createSocialNetwork: async (_: any, { input }: { input: any }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.socialNetworkService.createSocialNetwork(user.id, input);
    },
    updateSocialNetwork: async (_: any, { id, input }: { id: string; input: any }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.socialNetworkService.updateSocialNetwork(user.id, id, input);
    },
    deleteSocialNetwork: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.socialNetworkService.deleteSocialNetwork(user.id, id);
    },
  },

  SocialNetwork: {
    userId: (parent: { userId: Types.ObjectId }) => parent.userId.toString(),
  }
};