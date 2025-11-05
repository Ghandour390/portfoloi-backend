import { IContext } from "../../../shared/types";
import { ensureBucket } from '../../../shared/minioClient';

export const documentResolvers = {
  Query: {
    getDocument: async (
      _: any,
      { id }: { id: string },
      { services: { documentService } }: IContext
    ) => {
      return documentService.getDocumentById(id);
    },
    getUserDocuments: async (
      _: any,
      __: any,
      { user, services: { documentService } }: IContext
    ) => {
      if (!user?.id) {
        throw new Error('Authentication required');
      }
      return documentService.getUserDocuments(user.id);
    },
  },

  Mutation: {
    createDocument: async (
      _: any,
      { file, nom }: { file: any; nom?: string },
      { user, services: { documentService } }: IContext
    ) => {
      if (!user?.id) {
        throw new Error('Authentication required');
      }

      // Ensure bucket exists
      await ensureBucket();

      // file is a Upload scalar — it may be a promise
      const uploaded = await file;
      const { filename, createReadStream, mimetype } = uploaded;

      // Upload to MinIO and create DB record
      return documentService.createDocument(user.id, {
        filename: nom || filename,
        mimetype,
        stream: createReadStream(),
      });
    },

    updateDocument: async (
      _: any,
      { id, file, nom }: { id: string; file?: any; nom?: string },
      { user, services: { documentService } }: IContext
    ) => {
      if (!user?.id) {
        throw new Error('Authentication required');
      }

      // If a new file is provided, upload it
      if (file) {
        await ensureBucket();
        const uploaded = await file;
        const { filename, createReadStream, mimetype } = uploaded;

        return documentService.updateDocument(user.id, id, {
          filename: nom || filename,
          mimetype,
          stream: createReadStream(),
        });
      } else {
        // Only update the name if no file provided
        return documentService.updateDocumentMetadata(user.id, id, { nom });
      }
    },
    deleteDocument: async (
      _: any,
      { id }: { id: string },
      { user, services: { documentService } }: IContext
    ) => {
      if (!user?.id) {
        throw new Error('Authentication required');
      }
      return documentService.deleteDocument(user.id, id);
    },
  },
};