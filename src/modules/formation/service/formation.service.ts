import { IFormation } from '../model/formation.model';
import { IFormationRepository } from '../repository/formation.repository.interface';
import { AuthenticationError } from 'apollo-server-express';
import { Types } from 'mongoose';

export class FormationService {
  constructor(private readonly formationRepository: IFormationRepository) {}

  async createFormation(userId: string, data: Partial<IFormation>): Promise<IFormation> {
    const formation = await this.formationRepository.create({
      ...data,
      userId: new Types.ObjectId(userId)
    });
    return formation;
  }

  async updateFormation(userId: string, id: string, data: Partial<IFormation>): Promise<IFormation> {
    const formation = await this.formationRepository.findById(id);
    if (!formation) {
      throw new Error('Formation not found');
    }

    if (formation.userId.toString() !== userId) {
      throw new AuthenticationError('Not authorized');
    }

    const updated = await this.formationRepository.update(id, data);
    if (!updated) {
      throw new Error('Failed to update formation');
    }

    return updated;
  }

  async deleteFormation(userId: string, id: string): Promise<boolean> {
    const formation = await this.formationRepository.findById(id);
    if (!formation) {
      throw new Error('Formation not found');
    }

    if (formation.userId.toString() !== userId) {
      throw new AuthenticationError('Not authorized');
    }

    return this.formationRepository.delete(id);
  }

  async getFormationById(id: string): Promise<IFormation> {
    const formation = await this.formationRepository.findById(id);
    if (!formation) {
      throw new Error('Formation not found');
    }
    return formation;
  }

  async getUserFormations(userId: string): Promise<IFormation[]> {
    return this.formationRepository.findByUserId(userId);
  }

  async getFormationsByEcole(ecole: string): Promise<IFormation[]> {
    return this.formationRepository.findByEcole(ecole);
  }
}