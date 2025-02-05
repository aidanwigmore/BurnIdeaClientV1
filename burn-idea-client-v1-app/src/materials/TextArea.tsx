import React from 'react';

import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';

interface TextAreaProps {
    label : string;
    value : string;
    onChange : (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error : string;
}

function TextArea({ label, value, onChange, error } : TextAreaProps) {

  return (
      <TextareaAutosize
        minRows={3}
        placeholder={label}
        value={value}
        onChange={onChange}
        style={{width: '100%', margin: '12px'}}
      />
  );
}

export default TextArea;
