import { Schema, model, Types } from 'mongoose';

export interface ICompetence {
  nom: string;
  categorie: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const competenceSchema = new Schema<ICompetence>({
  nom: { type: String, required: true },
  categorie: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export const CompetenceModel = model<ICompetence>('Competence', competenceSchema);