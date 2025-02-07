import React from 'react';

import Box from '@mui/material/Box';

import Text from '@materials/Text';

import { Size } from '../types/Size';

interface IdeaBurnLogoProps {
    admin?: boolean;
}

function IdeaBurnLogo({ admin }: IdeaBurnLogoProps) {

    return (
        <Box
            sx={{display: 'inline-flex', alignItems: 'center'}}
        >
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="IdeaBurn Logo" style={{width: '50px', height: '50px'}} />            
                <Box
                    sx={{
                        display: 'inline-flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box 
                        sx={{
                            textAlign: 'right',
                            transform: 'translateY(15px)',
                        }}
                    >
                        {
                            admin && admin===true && (
                                <Text size={Size.small} text={'ADMIN'}/>
                            )
                        }
                    </Box>
                    <Box>
                        <Text size={Size.large} text={'IDEABURN'}/>                
                    </Box>
                </Box>
        </Box>
    );
};

export default IdeaBurnLogo;
