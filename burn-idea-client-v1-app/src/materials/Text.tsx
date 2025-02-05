import React from 'react';

import Typography from '@mui/material/Typography';

import customTheme from '../theme';
import { Size } from '../types/Size';

interface TextProps {
    text: string;
    size?: Size;
    color?: string;
    sx?: any;
}

function Text({ text, color, size, sx }: TextProps) {
    let fontFamily = 'Raleway';
    let fontSize = '36px';
    let fontWeight = 'normal';

    if (size) {
        switch (size) {
          case Size.small:
            fontFamily = 'Raleway Small';
            fontSize = '12px';
            fontWeight = 'bold';
            break;
          case Size.medium:
            fontFamily = 'Raleway Medium';
            fontSize = '24px';
            break;
          case Size.large:
            fontFamily = 'Raleway Large';
            fontSize = '36px';
            break;
          default:
            fontFamily = 'Raleway';
        }
      }

    return (
        <Typography
            color={customTheme.palette.custom.white}
            sx={{
                color: color,
                fontFamily: fontFamily,
                fontSize: fontSize,
                fontWeight: fontWeight,
                ...sx,
            }}
        >
            {text}
        </Typography>
    );
};

export default Text;
