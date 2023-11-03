import { IComment } from './model/comm';

export type replyToComments = CommentResponse[];

export interface CommentResponse {
  id: string;
  content: string;
  likes: number;
  likeByOwner: boolean;
  createdAt: string;
  replies?: replyToComments;
  repliedTo: string;
  chiefComment: boolean;
  owner: {
    name: string;
    avatarUrl?: string;
    id: string;
    userId: string;
  };
}

export const formatComment = (
  comment: IComment,
  user?: any
): CommentResponse => {
  const owner = comment.owner as any;
  return {
    id: comment._id.toString(),
    content: comment.content,
    likes: comment.likes?.length || 0,
    likeByOwner: comment.likes?.includes(user?._id) || false,
    createdAt: comment.createdAt?.toString() as any,

    repliedTo: comment?.replyTo?.toString() as any,
    chiefComment: comment?.chiefComment || false,
    owner: {
      id: owner._id.toString(),
      name: owner.name,
      avatarUrl: owner.avatarUrl,
      userId: owner.userId,
    },
  };
};
