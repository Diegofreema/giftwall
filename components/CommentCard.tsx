import Image from 'next/image';
import React from 'react';

type Props = {
  owner?: {
    name: string;
    avatar?: string;
    id: string;
  };
};

const CommentCard = ({ owner }: Props) => {
  return (
    <div>
      <div className="w-8 h-8 relative rounded overflow-hidden">
        {owner?.avatar ? (
          <Image src={owner.avatar} fill priority alt="avatar" />
        ) : (
          <span className="w-full inline-block bg-gray-400 text-black">
            {owner?.name.substring(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      <div></div>
    </div>
  );
};

export default CommentCard;
