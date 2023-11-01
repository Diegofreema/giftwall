// 'use client';
// import { useEditor, EditorContent, getMarkRange } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import Placeholder from '@tiptap/extension-placeholder';
// import Link from '@tiptap/extension-link';
// import Youtube from '@tiptap/extension-youtube';
// import Image from '@tiptap/extension-image';

// interface Post {

// }

// const Editor = ({ }: Post) => {

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Image.configure({
//         HTMLAttributes: {
//           class: 'mx-auto ',
//         },
//       }),
//       Youtube.configure({
//         width: 840,
//         height: 472.5,
//         HTMLAttributes: {
//           class: 'mx-auto rounded',
//         },
//       }),
//       Link.configure({
//         autolink: false,
//         linkOnPaste: false,
//         openOnClick: false,
//         HTMLAttributes: {
//           target: '',
//         },
//       }),
//       Placeholder.configure({
//         placeholder: 'Type something...',
//       }),
//     ],
//     editorProps: {
//       handleClick(view, pos, event) {
//         const { state } = view;
//         const selectionRange = getMarkRange(
//           state.doc.resolve(pos),
//           state.schema.marks.link
//         );
//         if (selectionRange) setSelectionRange(selectionRange);
//       },
//       attributes: {
//         class:
//           'prose prose-lg focus:outline-none dark:prose-invert maz-w-full mx-auto h-full',
//       },
//     },
//   });

//   return (

//         <EditorContent editor={editor} className="min-h-[300px]" />

//   );
// };

// export default Editor;
