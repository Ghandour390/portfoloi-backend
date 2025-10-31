import { IContext } from '../../../shared/types';
import { AuthenticationError } from 'apollo-server-express';
import { Types } from 'mongoose';

export const formationResolvers = {
  Query: {
    formation: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.formationService.getFormationById(id);
    },
    userFormations: async (_: any, { userId }: { userId: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.formationService.getUserFormations(userId);
    },
    formationsByEcole: async (_: any, { ecole }: { ecole: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.formationService.getFormationsByEcole(ecole);
    }
  },

  Mutation: {
    createFormation: async (_: any, { input }: { input: any }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.formationService.createFormation(user.id, input);
    },
    updateFormation: async (_: any, { id, input }: { id: string; input: any }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.formationService.updateFormation(user.id, id, input);
    },
    deleteFormation: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return services.formationService.deleteFormation(user.id, id);
    }
  },

  Formation: {
    userId: (parent: { userId: Types.ObjectId }) => parent.userId.toString(),
    dateDebut: (parent: { dateDebut: Date }) => parent.dateDebut.toISOString(),
    dateFin: (parent: { dateFin: Date }) => parent.dateFin.toISOString()
  }
};