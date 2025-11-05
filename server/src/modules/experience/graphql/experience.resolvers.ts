import { IContext } from '../../../shared/types';
import { requireAuth } from '../../../shared/auth';
import { Types } from 'mongoose';

export const experienceResolvers = {
  Query: {
    // Public - Les visiteurs peuvent voir les expériences
    experience: async (_: any, { id }: { id: string }, { services }: IContext) => {
      return services.experienceService.getExperienceById(id);
    },
    // Public - Les visiteurs peuvent voir les expériences d'un utilisateur
    userExperiences: async (_: any, { userId }: { userId: string }, { services }: IContext) => {
      return services.experienceService.getUserExperiences(userId);
    },
    // Public - Les visiteurs peuvent rechercher par entreprise
    experiencesByEntreprise: async (_: any, { entreprise }: { entreprise: string }, { services }: IContext) => {
      return services.experienceService.getExperiencesByEntreprise(entreprise);
    }
  },

  Mutation: {
    // Protégé - Seuls les propriétaires authentifiés peuvent créer
    createExperience: async (_: any, { input }: { input: any }, { user, services }: IContext) => {
      requireAuth(user);
      return services.experienceService.createExperience(user!.id, input);
    },
    // Protégé - Seuls les propriétaires authentifiés peuvent modifier
    updateExperience: async (_: any, { id, input }: { id: string; input: any }, { user, services }: IContext) => {
      requireAuth(user);
      return services.experienceService.updateExperience(user!.id, id, input);
    },
    // Protégé - Seuls les propriétaires authentifiés peuvent supprimer
    deleteExperience: async (_: any, { id }: { id: string }, { user, services }: IContext) => {
      requireAuth(user);
      return services.experienceService.deleteExperience(user!.id, id);
    }
  },

  Experience: {
    userId: (parent: { userId: Types.ObjectId }) => parent.userId.toString(),
    dateDebut: (parent: { dateDebut: Date }) => parent.dateDebut.toISOString(),
    dateFin: (parent: { dateFin: Date }) => parent.dateFin.toISOString()
  }
};