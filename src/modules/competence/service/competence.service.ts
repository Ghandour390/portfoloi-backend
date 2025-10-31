import { ICompetence } from '../model/competence.model';
import { ICompetenceRepository } from '../repository/competence.repository.interface';
import { AuthenticationError } from 'apollo-server-express';
import { Types } from 'mongoose';

export class CompetenceService {
  constructor(private readonly competenceRepository: ICompetenceRepository) {}

  async createCompetence(userId: string, data: Partial<ICompetence>): Promise<ICompetence> {
    const competence = await this.competenceRepository.create({
      ...data,
      userId: new Types.ObjectId(userId)
    });
    return competence;
  }

  async updateCompetence(userId: string, id: string, data: Partial<ICompetence>): Promise<ICompetence> {
    const competence = await this.competenceRepository.findById(id);
    if (!competence) {
      throw new Error('Competence not found');
    }

    if (competence.userId.toString() !== userId) {
      throw new AuthenticationError('Not authorized');
    }

    const updated = await this.competenceRepository.update(id, data);
    if (!updated) {
      throw new Error('Failed to update competence');
    }

    return updated;
  }

  async deleteCompetence(userId: string, id: string): Promise<boolean> {
    const competence = await this.competenceRepository.findById(id);
    if (!competence) {
      throw new Error('Competence not found');
    }

    if (competence.userId.toString() !== userId) {
      throw new AuthenticationError('Not authorized');
    }

    return this.competenceRepository.delete(id);
  }

  async getCompetenceById(id: string): Promise<ICompetence> {
    const competence = await this.competenceRepository.findById(id);
    if (!competence) {
      throw new Error('Competence not found');
    }
    return competence;
  }

  async getUserCompetences(userId: string): Promise<ICompetence[]> {
    return this.competenceRepository.findByUserId(userId);
  }

  async getCompetencesByCategorie(categorie: string): Promise<ICompetence[]> {
    return this.competenceRepository.findByCategorie(categorie);
  }
}