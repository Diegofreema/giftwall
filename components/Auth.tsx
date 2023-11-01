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
import { useAuthHook } from '@/hook/useAuth';
import { IUser } from '@/lib/model/user';
import { createUser } from '@/lib/actions/member';
import { useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useToast } from './UI/use-toast';
import { Textarea } from './UI/textarea';
type Prop = {
  name: string;
  email: string;
  bio: string;
};
export function AuthDialog() {
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [values, setValues] = useState({
    email: '',
    name: '',
    bio: '',
  });
  const { isOpen, onClose } = useAuthHook();
  const requiredFields = ['name', 'email', 'bio'];
  const emptyFields = requiredFields.filter(
    (field) => !values[field as keyof Prop]
  );

  const { toast } = useToast();
  const submitValues = async () => {
    if (emptyFields.length) {
      toast({
        variant: 'destructive',
        title: `${emptyFields.join(' and ')} ${
          emptyFields.length > 1 ? 'are' : 'is'
        } required`,
        description: 'Please fill required fields',
      });
      return;
    }

    await createUser({
      userId: user?.id,
      email: values.email,
      name: values.name,
      avatarUrl: user?.imageUrl,
    });
    onClose();
  };
  const handleInput = (val: any, name: string) => {
    setValues({
      ...values,
      [name]: val,
    });
  };

  const { mutate } = useMutation({
    mutationFn: async () => submitValues(),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Welcome onBoard',
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
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>Let us know you more</DialogDescription>
          <DialogTitle>Please complete your profile to comment</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className=" items-center space-y-4">
            <Label htmlFor="name" className="text-right">
              Full name
            </Label>
            <Input
              name="name"
              onChange={({ target }) => handleInput(target.value, 'name')}
              id="name"
              className="col-span-3"
            />
          </div>

          <div className=" items-center space-y-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              name="email"
              onChange={({ target }) => handleInput(target.value, 'email')}
              id="email"
              className="col-span-3"
            />
          </div>

          <div className=" items-center space-y-4">
            <Label htmlFor="bio" className="text-right">
              Bio
            </Label>
            <Textarea
              name="bio"
              onChange={({ target }) => handleInput(target.value, 'bio')}
              id="text"
              className="col-span-3"
            />
          </div>
        </form>
        <DialogFooter>
          <Button
            onClick={() => mutate()}
            type="submit"
            className="w-full bg-purple-900"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
