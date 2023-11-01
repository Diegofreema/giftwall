// import { Schema, ObjectId, model, models, Model } from 'mongoose';

// export interface IComment {
//   _id: ObjectId;
//   belongsTo: ObjectId;
//   owner: ObjectId;
//   content: string;
//   likes?: ObjectId[];
//   replies?: ObjectId[];
//   replyTo?: ObjectId;
//   chiefComment?: boolean;
//   createdAt?: string;
// }

// const commentSchema = new Schema<IComment>(
//   {
//     belongsTo: {
//       type: Schema.Types.ObjectId,
//       ref: 'BlogContent',
//     },

//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//     likes: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//       },
//     ],
//     replies: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: 'Comment',
//       },
//     ],
//     replyTo: {
//       type: Schema.Types.ObjectId,
//       ref: 'Comment',
//     },
//     chiefComment: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Com = models.Comment || model<IComment>('Com', commentSchema);

// export default Com as Model<IComment>;
