import Image from 'next/image';
import React, { useState } from 'react';
import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import { Button } from './UI/button';
import { Reply } from 'lucide-react';
import { IconEdit } from '@tabler/icons-react';
import { IconTrashFilled } from '@tabler/icons-react';
import CommentForm from './CommentForm';

type Props = {
  comment: {
    name: string;
    avatarUrl?: string;
    id: string;
    createdAt: string;
    content: string;
    owner: { avatarUrl: string; name: string };
  };
  showControls?: boolean;
  onUpdateSubmit?: (content: string) => void;
  onReplySubmit?: (content: string) => void;
  onDelete: () => void;
};

const CommentCard = ({
  comment,
  onReplySubmit,
  onUpdateSubmit,
  showControls = false,
  onDelete,
}: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [initialValue, setInitialValue] = useState('');
  const { owner, content, createdAt } = comment;
  const handleEdit = () => {
    setShowForm(true);
    setInitialValue(content);
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
        {owner?.avatarUrl ? (
          <Image src={owner.avatarUrl} fill priority alt="avatar" />
        ) : (
          <span className="w-full inline-block text-center leading-8  text-black">
            {owner?.name.substring(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex-1">
        <h1 className="text-lg text-black font-semibold">{owner?.name}</h1>
        <span className="text-sm text-gray-500">
          {dateFormat(createdAt, 'd-mmm-yyyy')}
        </span>
        <p className="text-black">{content && parse(content)}</p>
        <div className="flex space-x-1">
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
