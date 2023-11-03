'use client';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Button } from './UI/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from './UI/dialog';
import { Input } from './UI/input';
import { Label } from './UI/label';
import { useEffect, useState } from 'react';

import { IUser } from '@/lib/model/user';
import { createUser } from '@/lib/actions/member';
import { useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useToast } from './UI/use-toast';
import { Textarea } from './UI/textarea';
import { useDeleteHook } from '@/hook/useAuth';
import { deleteComment } from '@/lib/actions/comments';

type Prop = {
  name: string;
  email: string;
  bio: string;
};
export function DeleteModal() {
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  const {
    isOpen,
    onClose,
    id,
    onDelete,
    doNotDelete,
    delete: remove,
  } = useDeleteHook();
  console.log(id);

  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: async () => await deleteComment(id),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Deleted comment',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Something went wrong, please again later',
      });
      onClose();
    },
  });

  const handleDelete = () => {
    mutate();
    onClose();
  };
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this?</DialogTitle>
        </DialogHeader>

        <div className="!flex items-center space-x-3">
          <Button
            variant={'destructive'}
            onClick={() => {
              onDelete();
              onClose();
            }}
            type="submit"
            className="w-full"
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              doNotDelete();
              onClose();
            }}
            type="submit"
            className="w-full bg-purple-900"
          >
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
