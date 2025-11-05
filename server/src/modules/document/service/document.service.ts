import { IDocument } from '../model/document.model';
import { IDocumentRepository } from '../repository/document.repository.interface';
import { AuthenticationError } from 'apollo-server-express';
import { Types } from 'mongoose';
import { minioClient, getBucketName, getPublicUrlForObject } from '../../../shared/minioClient';
import { Readable } from 'stream';

export class DocumentService {
  constructor(private readonly documentRepository: IDocumentRepository) {}

  async createDocument(userId: string, file: { filename: string; mimetype: string; stream: Readable }): Promise<IDocument> {
    const objectName = `${userId}/${Date.now()}-${file.filename}`;
    const bucket = getBucketName();


    try {
      await minioClient.putObject(bucket, objectName, file.stream as any, { 'Content-Type': file.mimetype });
    } catch (err) {
   
      console.error('Error uploading to MinIO:', err);
      throw new Error('File upload failed');
    }

    const url = await getPublicUrlForObject(objectName);

    // create DB record
    const document = await this.documentRepository.create({
      nom: file.filename,
      urlStocket: url,
      userId: new Types.ObjectId(userId),
    } as any);

    return document;
  }

  // Update document with new file upload (replaces old file in MinIO)
  async updateDocument(userId: string, id: string, file: { filename: string; mimetype: string; stream: Readable }): Promise<IDocument> {
    const document = await this.documentRepository.findById(id);
    if (!document) {
      throw new Error('Document not found');
    }

    if (document.userId.toString() !== userId) {
      throw new AuthenticationError('Not authorized');
    }

    const objectName = `${userId}/${Date.now()}-${file.filename}`;
    const bucket = getBucketName();

    // upload new file to minio
    try {
      await minioClient.putObject(bucket, objectName, file.stream as any, { 'Content-Type': file.mimetype });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error uploading to MinIO:', err);
      throw new Error('File upload failed');
    }

    // get accessible URL (presigned or public)
    const url = await getPublicUrlForObject(objectName);

    // update DB record
    const updated = await this.documentRepository.update(id, {
      nom: file.filename,
      urlStocket: url,
    } as any);

    if (!updated) {
      throw new Error('Failed to update document');
    }

    return updated;
  }

  // Update only document metadata (name) without changing the file
  async updateDocumentMetadata(userId: string, id: string, data: { nom?: string }): Promise<IDocument> {
    const document = await this.documentRepository.findById(id);
    if (!document) {
      throw new Error('Document not found');
    }

    if (document.userId.toString() !== userId) {
      throw new AuthenticationError('Not authorized');
    }

    const updated = await this.documentRepository.update(id, data as any);
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