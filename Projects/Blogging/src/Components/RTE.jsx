import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller, useForm } from 'react-hook-form';
import conf from '../Config/conf';
export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'> 
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            value={value} // Make sure the current value is passed here
            apiKey= {conf.EditorApiKey}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image", "lists", "link", "code", "help"
              ],
              toolbar: "undo redo | bold italic | link image",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={(content) => {
              onChange(content); // Update the form state with the new content
            }}
          />
        )}
      />
    </div>
  );
}

// Example parent component using RTE
function MyForm() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Will include content from the RTE
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RTE name="content" control={control} label="Post Content" />
      <button type="submit">Submit</button>
    </form>
  );
}
