import { IExperience, ExperienceModel } from '../model/experience.model';
import { IExperienceRepository } from './experience.repository.interface';
import { Types } from 'mongoose';

export class ExperienceRepository implements IExperienceRepository {
  async findById(id: string): Promise<IExperience | null> {
    return ExperienceModel.findById(id);
  }

  async findByUserId(userId: string): Promise<IExperience[]> {
    return ExperienceModel.find({ userId: new Types.ObjectId(userId) });
  }

  async create(data: Partial<IExperience>): Promise<IExperience> {
    const experience = new ExperienceModel(data);
    return experience.save();
  }

  async update(id: string, data: Partial<IExperience>): Promise<IExperience | null> {
    return ExperienceModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await ExperienceModel.findByIdAndDelete(id);
    return !!result;
  }

  async findByEntreprise(entreprise: string): Promise<IExperience[]> {
    return ExperienceModel.find({ entreprise: new RegExp(entreprise, 'i') });
  }
}