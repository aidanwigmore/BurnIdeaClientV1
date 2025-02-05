import React from 'react';

import { Box, Card } from '@mui/material';

import Text from '@materials/Text';
import RatingComponent from '@mui/material/Rating';

import customTheme from '../theme';

import Idea from '../types/Idea';

import { Size } from '../types/Size';

interface IdeaInfoCardProps {
    idea: Idea;
}

function IdeaInfoCard({ idea }: IdeaInfoCardProps) {
    return (
        <Card
            sx={{
                '@keyframes fadeIn': {
                    from: {
                        opacity: 0,
                    },
                    to: {
                        opacity: 1,
                    },
                },
                animation: 'fadeIn 1s ease-in-out',
                marginBottom: "12px",
                borderRadius: "15px",
                width: { xs: '100%', sm: '100%' },
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            }} variant="outlined"
        >
            <Box
                sx={{
                    marginLeft: '12px',
                    marginRight: '12px',
                }}
            >
                <Box>
                    <Text text={`'${idea.name}' Details:`} size={Size.large}/>
                    <Text text={`${idea.ideaDescription}`} size={Size.medium}/>
                </Box>
                <Box
                    sx={{
                        width: '99%',
                        display: 'inline-flex',
                        flexDirection: 'row',
                    }}
                >
                    <Text text={"Dificulty: "} size={Size.medium}/>
                    <RatingComponent
                        name="rating"
                        value={idea?.ideaDifficulty}
                        onChange={() => { }}
                        size="large"
                        readOnly={true}
                        sx={{marginLeft: '0', color: customTheme.palette.primary.dark}}
                    />
                </Box>
            </Box>
        </Card >
    )
}

export default IdeaInfoCard;