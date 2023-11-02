import Image from 'next/image';
import React from 'react';

type Props = {
  owner?: {
    name: string;
    avatar: string;
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
          <p>{owner?.name.substring(0, 1).toUpperCase()}</p>
        )}
      </div>

      <div></div>
    </div>
  );
};

export default CommentCard;
