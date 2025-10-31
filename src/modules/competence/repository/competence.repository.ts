import { ICompetence, CompetenceModel } from '../model/competence.model';
import { ICompetenceRepository } from './competence.repository.interface';
import { Types } from 'mongoose';

export class CompetenceRepository implements ICompetenceRepository {
  async findById(id: string): Promise<ICompetence | null> {
    return CompetenceModel.findById(id);
  }

  async findByUserId(userId: string): Promise<ICompetence[]> {
    return CompetenceModel.find({ userId: new Types.ObjectId(userId) });
  }

  async create(data: Partial<ICompetence>): Promise<ICompetence> {
    const competence = new CompetenceModel(data);
    return competence.save();
  }

  async update(id: string, data: Partial<ICompetence>): Promise<ICompetence | null> {
    return CompetenceModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await CompetenceModel.findByIdAndDelete(id);
    return !!result;
  }

  async findByCategorie(categorie: string): Promise<ICompetence[]> {
    return CompetenceModel.find({ categorie });
  }
}