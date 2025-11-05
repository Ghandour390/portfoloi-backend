import { Schema, model, Types } from 'mongoose';

export interface ISocialNetwork {
  nom: string;
  liensSociaux: string;
  icon: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const socialNetworkSchema = new Schema<ISocialNetwork>({
  nom: { type: String, required: true },
  liensSociaux: { type: String, required: true },
  icon: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export const SocialNetworkModel = model<ISocialNetwork>('SocialNetwork', socialNetworkSchema);