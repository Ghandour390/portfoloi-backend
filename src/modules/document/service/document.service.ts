import { IDocument } from '../model/document.model';
import { IDocumentRepository } from '../repository/document.repository.interface';
import { AuthenticationError } from 'apollo-server-express';
import { Types } from 'mongoose';

export class DocumentService {
  constructor(private readonly documentRepository: IDocumentRepository) {}

  async createDocument(userId: string, data: Partial<IDocument>): Promise<IDocument> {
    const document = await this.documentRepository.create({
      ...data,
      userId: new Types.ObjectId(userId)
    });
    return document;
  }

  async updateDocument(userId: string, id: string, data: Partial<IDocument>): Promise<IDocument> {
    const document = await this.documentRepository.findById(id);
    if (!document) {
      throw new Error('Document not found');
    }

    if (document.userId.toString() !== userId) {
      throw new AuthenticationError('Not authorized');
    }

    const updated = await this.documentRepository.update(id, data);
    if (!updated) {
      throw new Error('Failed to update document');
    }

    return updated;
  }

  async deleteDocument(userId: string, id: string): Promise<boolean> {
    const document = await this.documentRepository.findById(id);
    if (!document) {
      throw new Error('Document not found');
    }

    if (document.userId.toString() !== userId) {
      throw new AuthenticationError('Not authorized');
    }

    return this.documentRepository.delete(id);
  }

  async getDocumentById(id: string): Promise<IDocument> {
    const document = await this.documentRepository.findById(id);
    if (!document) {
      throw new Error('Document not found');
    }
    return document;
  }

  async getUserDocuments(userId: string): Promise<IDocument[]> {
    return this.documentRepository.findByUserId(userId);
  }
}