import { Schema, model, models, ObjectId, Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  avatarUrl?: string;
  role?: 'user' | 'admin';
  userId?: string;
  boarded?: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatarUrl: { type: String },
    userId: { type: String },
    boarded: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User as Model<IUser>;
