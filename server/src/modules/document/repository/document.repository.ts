import { IDocument, DocumentModel } from '../model/document.model';
import { IDocumentRepository } from './document.repository.interface';
import { Types } from 'mongoose';

export class DocumentRepository implements IDocumentRepository {
  async findById(id: string): Promise<IDocument | null> {
    return DocumentModel.findById(id);
  }

  async findByUserId(userId: string): Promise<IDocument[]> {
    return DocumentModel.find({ userId: new Types.ObjectId(userId) });
  }

  async create(data: Partial<IDocument>): Promise<IDocument> {
    const document = new DocumentModel(data);
    return document.save();
  }

  async update(id: string, data: Partial<IDocument>): Promise<IDocument | null> {
    return DocumentModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await DocumentModel.findByIdAndDelete(id);
    return !!result;
  }
}