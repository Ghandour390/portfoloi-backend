declare module 'graphql-upload' {
  import { RequestHandler } from 'express';
  import { GraphQLScalarType } from 'graphql';

  export interface UploadOptions {
    maxFieldSize?: number;
    maxFileSize?: number;
    maxFiles?: number;
  }

  export interface FileUpload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => NodeJS.ReadableStream;
  }

  export function graphqlUploadExpress(options?: UploadOptions): RequestHandler;
  
  export const GraphQLUpload: GraphQLScalarType;
}
