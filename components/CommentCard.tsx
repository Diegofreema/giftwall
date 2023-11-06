import Image from 'next/image';
import React, { useState } from 'react';
import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import { Button } from './UI/button';
import { Reply } from 'lucide-react';
import { IconEdit } from '@tabler/icons-react';
import { IconTrashFilled } from '@tabler/icons-react';
import CommentForm from './CommentForm';
import LikeComponent from './LikeComponent';

type Props = {
  comment: {
    name: string;
    avatarUrl?: string;
    id: string;
    createdAt: string;
    content: string;
    likes: number;
    likeByOwner: boolean;
    owner: { avatarUrl: string; name: string };
  };

  onClick: () => void;
  showControls?: boolean;
  onUpdateSubmit?: (content: string) => void;
  onReplySubmit?: (content: string) => void;
  onDelete: () => void;
  likeReply: boolean;
};

const CommentCard = ({
  comment,
  onReplySubmit,
  onUpdateSubmit,
  showControls = false,
  onDelete,
  likeReply,
  onClick,
}: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [initialValue, setInitialValue] = useState('');

  const handleEdit = () => {
    setShowForm(true);
    setInitialValue(comment?.content);
  };
  const displayReplyForm = () => {
    setInitialValue('');
    setShowForm(true);
  };
  const handleCommentSubmit = (comment: string) => {
    if (initialValue) {
      onUpdateSubmit && onUpdateSubmit(comment);
    } else {
      onReplySubmit && onReplySubmit(comment);
    }
    setShowForm(false);
  };
  return (
    <div className="flex flex-col sm:flex-row sm:space-x-3 ">
      <div className="w-8 h-8 relative rounded-full items-center bg-gray-400 justify-center overflow-hidden">
        {comment?.owner?.avatarUrl ? (
          <Image src={comment?.owner?.avatarUrl} fill priority alt="avatar" />
        ) : (
          <span className="w-full inline-block text-center leading-8  text-black">
            {comment?.owner?.name.substring(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex-1">
        <h1 className="text-lg text-black font-semibold">
          {comment?.owner?.name}
        </h1>
        <span className="text-sm text-gray-500">
          {dateFormat(comment?.createdAt, 'd-mmm-yyyy')}
        </span>
        <div className="text-black">
          {comment?.content && parse(comment?.content)}
        </div>
        <div className="flex space-x-1">
          <LikeComponent
            liked={comment?.likeByOwner}
            label={comment?.likes + ' ' + 'likes'}
            onClick={onClick}
            busy={likeReply}
          />
          <Buttons onClick={displayReplyForm}>
            <Reply size={15} />
            <span className="text-xs">Reply</span>
          </Buttons>
          {showControls && (
            <>
              <Buttons onClick={handleEdit}>
                <IconEdit size={15} />
                <span className="text-xs">Edit</span>
              </Buttons>
              <Buttons onClick={() => onDelete()}>
                <IconTrashFilled size={15} />
                <span className="text-xs">Delete</span>
              </Buttons>
            </>
          )}
        </div>
        {showForm && (
          <div className="mt-3">
            <CommentForm
              onSubmit={handleCommentSubmit}
              onClose={() => setShowForm(false)}
              initialValue={initialValue}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;

const Buttons = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      variant={'ghost'}
      size={'sm'}
      className="flex items-center !outline-none !border-none text-black  space-x-2"
    >
      {children}
    </Button>
  );
};
