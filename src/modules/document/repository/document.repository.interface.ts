import { IDocument } from '../model/document.model';

export interface IDocumentRepository {
  findById(id: string): Promise<IDocument | null>;
  findByUserId(userId: string): Promise<IDocument[]>;
  create(data: Partial<IDocument>): Promise<IDocument>;
  update(id: string, data: Partial<IDocument>): Promise<IDocument | null>;
  delete(id: string): Promise<boolean>;
}