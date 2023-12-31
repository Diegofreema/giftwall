'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@mantine/core';

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useToast } from './UI/use-toast';
import { useEffect } from 'react';

type Props = {
  onSubmit: (value: string) => void;
  busy?: boolean;
  onClose?: () => void;
  initialValue?: string;
};

const CommentForm = ({ onSubmit, busy, onClose, initialValue }: Props) => {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Add a comment...',
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-lg focus:outline-none dark:prose-invert maz-w-full mx-auto h-full',
      },
    },
  });
  useEffect(() => {
    if (typeof initialValue === 'string')
      editor?.commands.setContent(initialValue);
  }, [initialValue, editor]);
  const handleSubmit = () => {
    if (editor && !busy) {
      const value = editor?.getHTML();
      if (value === '<p></p>') {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Comment cannot be empty',
        });
        return;
      }
      onSubmit(value);
      editor?.commands.setContent('<p></p>');
    }
  };
  return (
    <div>
      {' '}
      <h1>Add comment</h1>
      <EditorContent
        editor={editor}
        className="!min-h-[200px] border-2 border-gray-400 rounded-md p-2"
      />
      <div>
        <Button
          disabled={busy}
          onClick={handleSubmit}
          className="mt-5 !bg-purple-900 "
        >
          Submit
        </Button>
        {onClose && (
          <Button onClick={onClose} variant="ghost" className="text-black">
            Close
          </Button>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
