import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@mantine/core';

type Props = {};

const CommentForm = (props: Props) => {
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
  return (
    <div>
      {' '}
      <h1>Add comment</h1>
      <EditorContent
        editor={editor}
        className="!min-h-[200px] border-2 border-gray-400 rounded-md p-2"
      />
      <Button className="mt-5 !bg-purple-900 ">Submit</Button>
    </div>
  );
};

export default CommentForm;
