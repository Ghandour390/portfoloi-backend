import { IContext } from '../../../shared/types';
import { AuthenticationError } from 'apollo-server-express';
import { Types } from 'mongoose';

export const competenceResolvers = {
  Query: {
    competence: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.competenceService.getCompetenceById(id);
    },
    userCompetences: async (_: any, { userId }: { userId: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.competenceService.getUserCompetences(userId);
    },
    competencesByCategorie: async (_: any, { categorie }: { categorie: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.competenceService.getCompetencesByCategorie(categorie);
    }
  },

  Mutation: {
    createCompetence: async (_: any, { input }: { input: any }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.competenceService.createCompetence(user.id, input);
    },
    updateCompetence: async (_: any, { id, input }: { id: string; input: any }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.competenceService.updateCompetence(user.id, id, input);
    },
    deleteCompetence: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.competenceService.deleteCompetence(user.id, id);
    }
  },

  Competence: {
    userId: (parent: { userId: Types.ObjectId }) => parent.userId.toString()
  }
};