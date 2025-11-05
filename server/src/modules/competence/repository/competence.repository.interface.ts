import { ICompetence } from '../model/competence.model';

export interface ICompetenceRepository {
  findById(id: string): Promise<ICompetence | null>;
  findByUserId(userId: string): Promise<ICompetence[]>;
  create(data: Partial<ICompetence>): Promise<ICompetence>;
  update(id: string, data: Partial<ICompetence>): Promise<ICompetence | null>;
  delete(id: string): Promise<boolean>;
  findByCategorie(categorie: string): Promise<ICompetence[]>;
}