import { Schema, model, Types } from 'mongoose';

export interface IDocument {
  nom: string;
  urlStocket: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new Schema<IDocument>({
  nom: { type: String, required: true },
  urlStocket: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export const DocumentModel = model<IDocument>('Document', documentSchema);