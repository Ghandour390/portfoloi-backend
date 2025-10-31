import { IFormation } from '../model/formation.model';

export interface IFormationRepository {
  findById(id: string): Promise<IFormation | null>;
  findByUserId(userId: string): Promise<IFormation[]>;
  create(data: Partial<IFormation>): Promise<IFormation>;
  update(id: string, data: Partial<IFormation>): Promise<IFormation | null>;
  delete(id: string): Promise<boolean>;
  findByEcole(ecole: string): Promise<IFormation[]>;
}