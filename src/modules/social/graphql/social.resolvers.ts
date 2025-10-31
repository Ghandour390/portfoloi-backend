import { IContext } from '../../../shared/types';
import { requireAuth } from '../../../shared/auth';
import { Types } from 'mongoose';

export const socialNetworkResolvers = {
  Query: {
    // Public - Les visiteurs peuvent voir les réseaux sociaux
    socialNetwork: async (_: any, { id }: { id: string }, { services }: IContext) => {
      return services.socialNetworkService.getSocialNetworkById(id);
    },
    // Public - Les visiteurs peuvent voir les réseaux sociaux d'un utilisateur
    userSocialNetworks: async (_: any, { userId }: { userId: string }, { services }: IContext) => {
      return services.socialNetworkService.getUserSocialNetworks(userId);
    },
  },
  Mutation: {
    // Protégé - Seuls les propriétaires authentifiés peuvent créer
    createSocialNetwork: async (_: any, { input }: { input: any }, { user, services }: IContext) => {
      requireAuth(user);
      return services.socialNetworkService.createSocialNetwork(user!.id, input);
    },
    // Protégé - Seuls les propriétaires authentifiés peuvent modifier
    updateSocialNetwork: async (_: any, { id, input }: { id: string; input: any }, { user, services }: IContext) => {
      requireAuth(user);
      return services.socialNetworkService.updateSocialNetwork(user!.id, id, input);
    },
    // Protégé - Seuls les propriétaires authentifiés peuvent supprimer
    deleteSocialNetwork: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      requireAuth(user);
      return services.socialNetworkService.deleteSocialNetwork(user!.id, id);
    },
  },

  SocialNetwork: {
    userId: (parent: { userId: Types.ObjectId }) => parent.userId.toString(),
  }
};