import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  image?: string;
  dateNaissance: Date;
  cover?: string;
  adresse: string;
  biographie: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  dateNaissance: { type: Date, required: true },
  cover: { type: String },
  adresse: { type: String, required: true },
  biographie: { type: String, required: true }
}, {
  timestamps: true
});


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<IUser>('User', userSchema);