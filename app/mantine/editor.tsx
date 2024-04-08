"use client"
import '@mantine/tiptap/styles.css';
import { RichTextEditor, Link, useRichTextEditorContext } from '@mantine/tiptap';
import { BubbleMenu, Editor, useEditor } from '@tiptap/react';
import { IconPhoto } from '@tabler/icons-react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useCallback, useEffect, useState } from 'react';
import { createLowlight } from 'lowlight';
import ts from 'highlight.js/lib/languages/typescript';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';







//const content =
//  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

export default function TextEditor() {

    

    const lowlight = createLowlight();

    // register languages that you are planning to use
    lowlight.register({ ts });

    function escapeHtml(unsafe: string) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    const codeExample = escapeHtml(`// Valid braces Kata – https://www.codewars.com/kata/5277c8a221e209d3f6000b56

    const pairs: Record<string, string> = {
    '[': ']',
    '{': '}',
    '(': ')',
    };

    const openBraces = Object.keys(pairs);

    export function validBraces(braces: string) {
    const opened: string[] = [];

    for (let i = 0; i < braces.length; i += 1) {
        const brace = braces[i];

        if (openBraces.includes(brace)) {
        opened.push(brace);
        continue;
        }

        if (pairs[opened[opened.length - 1]] !== brace) {
        return false
        }

        opened.pop();
    }

    return opened.length === 0;
    }`);

    const [Content, setContent] = useState(`
        <h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul><pre><code>${codeExample}</code></pre>
    `);  

    useEffect(() => {
      console.log(Content);
    }, [Content]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle, 
      Color,
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: Content,
    onUpdate: ({ editor }) => {
        setContent(editor.getHTML());
    },
  });



  function InsertImageControl() {
    
    const { editor } = useRichTextEditorContext();

    const addImage = useCallback(() => {
        const url = window.prompt("URL");
        if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);
       
    return (
      <RichTextEditor.Control
        onClick={addImage}
        aria-label="Insert Image"
        title="Insert Image"
      >
        <IconPhoto stroke={1.5} size="1rem" />
      </RichTextEditor.Control>
    );
  }

  return (
    <RichTextEditor editor={editor}>
        {editor && (
        <BubbleMenu editor={editor}>
          <RichTextEditor.ControlsGroup className="border-2">
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Link />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
            <RichTextEditor.AlignCenter />
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
      )}
      {/* <RichTextEditor.Toolbar sticky stickyOffset={60}> */}
      <RichTextEditor.Toolbar >
        {/* <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup> */}


        <RichTextEditor.ControlsGroup className="border-2">
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className="border-2">
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className="border-2">
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className="border-2">
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className="border-2">
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>


        <RichTextEditor.ControlsGroup className="border-2">
          <RichTextEditor.CodeBlock />
          <InsertImageControl />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup className="border-2">
        <RichTextEditor.ColorPicker
          colors={[
            '#25262b',
            '#868e96',
            '#fa5252',
            '#e64980',
            '#be4bdb',
            '#7950f2',
            '#4c6ef5',
            '#228be6',
            '#15aabf',
            '#12b886',
            '#40c057',
            '#82c91e',
            '#fab005',
            '#fd7e14',
          ]}
        />

          <RichTextEditor.Color color="#F03E3E" />
          <RichTextEditor.Color color="#7048E8" />
          <RichTextEditor.Color color="#1098AD" />
          <RichTextEditor.Color color="#37B24D" />
          <RichTextEditor.Color color="#F59F00" />
        

        <RichTextEditor.UnsetColor />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}