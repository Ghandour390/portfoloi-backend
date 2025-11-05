import { IFormation, FormationModel } from '../model/formation.model';
import { IFormationRepository } from './formation.repository.interface';
import { Types } from 'mongoose';

export class FormationRepository implements IFormationRepository {
  async findById(id: string): Promise<IFormation | null> {
    return FormationModel.findById(id);
  }

  async findByUserId(userId: string): Promise<IFormation[]> {
    return FormationModel.find({ userId: new Types.ObjectId(userId) });
  }

  async create(data: Partial<IFormation>): Promise<IFormation> {
    const formation = new FormationModel(data);
    return formation.save();
  }

  async update(id: string, data: Partial<IFormation>): Promise<IFormation | null> {
    return FormationModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await FormationModel.findByIdAndDelete(id);
    return !!result;
  }

  async findByEcole(ecole: string): Promise<IFormation[]> {
    return FormationModel.find({ ecole: new RegExp(ecole, 'i') });
  }
}