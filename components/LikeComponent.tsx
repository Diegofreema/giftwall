import { IconHeartFilled } from '@tabler/icons-react';
import { Heart } from 'lucide-react';
import React from 'react';

type Props = {
  liked: boolean;
  label: string;
  onClick: () => void;
};

const LikeComponent = ({ label, liked = false, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="text-black flex items-center space-x-2 outline-none"
    >
      {liked ? <IconHeartFilled size={15} /> : <Heart size={15} />}
      <span>{label}</span>
    </button>
  );
};

export default LikeComponent;
