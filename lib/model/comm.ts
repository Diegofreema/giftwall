import { Schema, ObjectId, model, models, Model } from 'mongoose';

export interface IComment {
  _id: ObjectId;
  belongsTo: ObjectId;
  owner: ObjectId;
  content: string;
  likes?: ObjectId[];
  replies?: ObjectId[];
  replyTo?: ObjectId;
  chiefComment?: boolean;
  createdAt?: string;
}

const comSchema = new Schema<IComment>(
  {
    belongsTo: {
      type: Schema.Types.ObjectId,
      ref: 'BlogContent',
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Com',
      },
    ],
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: 'Com',
    },
    chiefComment: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Com = models.Com || model<IComment>('Com', comSchema);

export default Com as Model<IComment>;
