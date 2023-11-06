import { IconHeartFilled } from '@tabler/icons-react';
import { Heart, Loader } from 'lucide-react';
import React from 'react';

type Props = {
  liked: boolean;
  label: string;
  onClick: () => void;
  busy?: boolean;
};

const LikeComponent = ({ label, liked = false, onClick, busy }: Props) => {
  return (
    <button
      onClick={onClick}
      className="text-black flex items-center space-x-2 outline-none"
    >
      {busy && <Loader size={15} className="animate-spin" />}
      {!busy && (liked ? <IconHeartFilled size={15} /> : <Heart size={15} />)}
      <span>{label}</span>
    </button>
  );
};

export default LikeComponent;
