import { IExperience } from '../model/experience.model';
import { IExperienceRepository } from '../repository/experience.repository.interface';
import { AuthenticationError } from 'apollo-server-express';
import { Types } from 'mongoose';

export class ExperienceService {
  constructor(private readonly experienceRepository: IExperienceRepository) {}

  async createExperience(userId: string, data: Partial<IExperience>): Promise<IExperience> {
    const experience = await this.experienceRepository.create({
      ...data,
      userId: new Types.ObjectId(userId)
    });
    return experience;
  }

  async updateExperience(userId: string, id: string, data: Partial<IExperience>): Promise<IExperience> {
    const experience = await this.experienceRepository.findById(id);
    if (!experience) {
      throw new Error('Experience not found');
    }

    if (experience.userId.toString() !== userId) {
      throw new AuthenticationError('Not authorized');
    }

    const updated = await this.experienceRepository.update(id, data);
    if (!updated) {
      throw new Error('Failed to update experience');
    }

    return updated;
  }

  async deleteExperience(userId: string, id: string): Promise<boolean> {
    const experience = await this.experienceRepository.findById(id);
    if (!experience) {
      throw new Error('Experience not found');
    }

    if (experience.userId.toString() !== userId) {
      throw new AuthenticationError('Not authorized');
    }

    return this.experienceRepository.delete(id);
  }

  async getExperienceById(id: string): Promise<IExperience> {
    const experience = await this.experienceRepository.findById(id);
    if (!experience) {
      throw new Error('Experience not found');
    }
    return experience;
  }

  async getUserExperiences(userId: string): Promise<IExperience[]> {
    return this.experienceRepository.findByUserId(userId);
  }

  async getExperiencesByEntreprise(entreprise: string): Promise<IExperience[]> {
    return this.experienceRepository.findByEntreprise(entreprise);
  }
}