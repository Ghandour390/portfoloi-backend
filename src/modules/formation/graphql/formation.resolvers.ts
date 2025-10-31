import { IContext } from '../../../shared/types';
import { requireAuth } from '../../../shared/auth';
import { Types } from 'mongoose';

export const formationResolvers = {
  Query: {
    // Public - Les visiteurs peuvent voir les formations
    formation: async (_: any, { id }: { id: string }, { services }: IContext) => {
      return services.formationService.getFormationById(id);
    },
    // Public - Les visiteurs peuvent voir les formations d'un utilisateur
    userFormations: async (_: any, { userId }: { userId: string }, { services }: IContext) => {
      return services.formationService.getUserFormations(userId);
    },
    // Public - Les visiteurs peuvent rechercher par école
    formationsByEcole: async (_: any, { ecole }: { ecole: string }, { services }: IContext) => {
      return services.formationService.getFormationsByEcole(ecole);
    }
  },

  Mutation: {
    // Protégé - Seuls les propriétaires authentifiés peuvent créer
    createFormation: async (_: any, { input }: { input: any }, { user, services }: IContext) => {
      requireAuth(user);
      return services.formationService.createFormation(user!.id, input);
    },
    // Protégé - Seuls les propriétaires authentifiés peuvent modifier
    updateFormation: async (_: any, { id, input }: { id: string; input: any }, { user, services }: IContext) => {
      requireAuth(user);
      return services.formationService.updateFormation(user!.id, id, input);
    },
    // Protégé - Seuls les propriétaires authentifiés peuvent supprimer
    deleteFormation: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      requireAuth(user);
      return services.formationService.deleteFormation(user!.id, id);
    }
  },

  Formation: {
    userId: (parent: { userId: Types.ObjectId }) => parent.userId.toString(),
    dateDebut: (parent: { dateDebut: Date }) => parent.dateDebut.toISOString(),
    dateFin: (parent: { dateFin: Date }) => parent.dateFin.toISOString()
  }
};