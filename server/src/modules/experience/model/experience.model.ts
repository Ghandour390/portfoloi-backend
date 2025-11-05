import { Schema, model, Types } from 'mongoose';

export interface IExperience {
  poste: string;
  entreprise: string;
  dateDebut: Date;
  dateFin: Date;
  description: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<IExperience>({
  poste: { type: String, required: true },
  entreprise: { type: String, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  description: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export const ExperienceModel = model<IExperience>('Experience', experienceSchema);