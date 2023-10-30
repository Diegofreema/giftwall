'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/UI/card';
import { useToast } from '@/components/UI/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface Props {
  post: {
    id: string;
    title: string;
    meta: string;
    thumbnail: string | undefined;

    createdAt: string;
  };
  tags: string[];
  formattedDate: string;
}

const PostCard: FC<Props> = ({
  post,
  formattedDate,
  tags,
}): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  const { toast } = useToast();
  const trimText = (text: string, trimBy: number) => {
    if (text.length <= trimBy) {
      return text;
    }
    return text.substring(0, trimBy) + '...';
  };

  if (!isMounted) return null;
  return (
    <Card key={post.id} className="cursor-pointer shadow-black/50 shadow-sm">
      <Link href={`/blog/${post.id}`}>
        <CardHeader className="!overflow-hidden rounded-tl-sm rounded-tr-sm">
          <div className="w-full h-[200px] rounded-sm flex items-center justify-center relative !overflow-hidden">
            {post?.thumbnail && (
              <Image
                fill
                src={post?.thumbnail}
                alt="Image"
                className="object-cover"
              />
            )}
            {!post?.thumbnail && <h3 className="text-center">No image</h3>}
          </div>
          <CardDescription className="flex justify-between items-center p-4">
            {tags.map((tag, index) => (
              <span key={index}>#{tag}</span>
            ))}
            <p>{formattedDate}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 !min-h-[100px] p-4">
          <h3 className="font-semibold first-letter:capitalize">
            {trimText(post?.title, 20)}
          </h3>
          <p className="first-letter:capitalize">{trimText(post?.meta, 70)}</p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PostCard;
