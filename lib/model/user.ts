import { Schema, model, models, ObjectId, Model } from 'mongoose';

export interface IUser {
  name: string;

  avatarUrl?: string;
  role: 'user' | 'admin';
  userId: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },

    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatarUrl: { type: String },
    userId: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User as Model<IUser>;
