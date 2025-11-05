import { Schema, model, Types } from 'mongoose';

export interface IFormation {
  filiere: string;
  ecole: string;
  localisation: string;
  dateDebut: Date;
  dateFin: Date;
  description: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const formationSchema = new Schema<IFormation>({
  filiere: { type: String, required: true },
  ecole: { type: String, required: true },
  localisation: { type: String, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  description: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export const FormationModel = model<IFormation>('Formation', formationSchema);