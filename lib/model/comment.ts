import { Schema, ObjectId, model, models, Model } from 'mongoose';

export interface IComment {
  _id: ObjectId;

  owner: ObjectId;
  content: string;
  likes?: ObjectId[];
  replies?: ObjectId[];
  replyTo?: ObjectId;
  chiefComment?: boolean;
  createdAt?: string;
}

const commentSchema = new Schema<IComment>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
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
        ref: 'Comment',
      },
    ],
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
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

const Comment = models.Comment || model<IComment>('Comment', commentSchema);

export default Comment as Model<IComment>;
