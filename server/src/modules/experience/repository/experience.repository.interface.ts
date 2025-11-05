import { IExperience } from '../model/experience.model';

export interface IExperienceRepository {
  findById(id: string): Promise<IExperience | null>;
  findByUserId(userId: string): Promise<IExperience[]>;
  create(data: Partial<IExperience>): Promise<IExperience>;
  update(id: string, data: Partial<IExperience>): Promise<IExperience | null>;
  delete(id: string): Promise<boolean>;
  findByEntreprise(entreprise: string): Promise<IExperience[]>;
}