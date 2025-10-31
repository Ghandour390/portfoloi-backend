import { IContext } from "../../../shared/types";
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
      { input }: { input: any },
      { user, services: { documentService } }: IContext
    ) => {
      if (!user?.id) {
        throw new Error('Authentication required');
      }
      return documentService.createDocument(user.id, input);
    },
    updateDocument: async (
      _: any,
      { id, input }: { id: string; input: any },
      { user, services: { documentService } }: IContext
    ) => {
      if (!user?.id) {
        throw new Error('Authentication required');
      }
      return documentService.updateDocument(user.id, id, input);
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