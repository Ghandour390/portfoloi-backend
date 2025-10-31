import { IContext } from '../../../shared/types';
import { AuthenticationError } from 'apollo-server-express';
import { Types } from 'mongoose';

export const experienceResolvers = {
  Query: {
    experience: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.experienceService.getExperienceById(id);
    },
    userExperiences: async (_: any, { userId }: { userId: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.experienceService.getUserExperiences(userId);
    },
    experiencesByEntreprise: async (_: any, { entreprise }: { entreprise: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.experienceService.getExperiencesByEntreprise(entreprise);
    }
  },

  Mutation: {
    createExperience: async (_: any, { input }: { input: any }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.experienceService.createExperience(user.id, input);
    },
    updateExperience: async (_: any, { id, input }: { id: string; input: any }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.experienceService.updateExperience(user.id, id, input);
    },
    deleteExperience: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.experienceService.deleteExperience(user.id, id);
    }
  },

  Experience: {
    userId: (parent: { userId: Types.ObjectId }) => parent.userId.toString(),
    dateDebut: (parent: { dateDebut: Date }) => parent.dateDebut.toISOString(),
    dateFin: (parent: { dateFin: Date }) => parent.dateFin.toISOString()
  }
};