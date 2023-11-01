'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@mantine/core';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

type Props = {};

const CommentForm = (props: Props) => {
  const { user } = useUser();
  const router = useRouter();
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
  const handleSubmit = () => {
    if (!user) {
      router.push('/sign-in/[[...sign-in]]');
    }
    console.log('submit');
  };
  return (
    <div>
      {' '}
      <h1>Add comment</h1>
      <EditorContent
        editor={editor}
        className="!min-h-[200px] border-2 border-gray-400 rounded-md p-2"
      />
      <Button onClick={handleSubmit} className="mt-5 !bg-purple-900 ">
        Submit
      </Button>
    </div>
  );
};

export default CommentForm;
