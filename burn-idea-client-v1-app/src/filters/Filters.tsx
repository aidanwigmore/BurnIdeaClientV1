import React, { useState } from 'react';

import { Box, FormControlLabel, Button, Collapse } from '@mui/material';

import Text from '@materials/Text';
import SearchInput from '@materials/SearchInput';
import FilterDivider from '@materials/FilterDivider';
import FilterSwitch from '@materials/FilterSwitch';

import customTheme from '../theme';

import { Size } from '../types/Size';

interface FiltersProps {
    context: string;
    showDescription?: boolean;
    handleSortNoDescriptionChange?: () => void;
    showIdeas?: boolean;
    handleSortNoIdeasChange?: () => void;
    handleSortNewChange?: () => void;
    handleSortAlphaBeticalChange?: () => void;
    searchQuery?: string;
    handleSearchInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

function Filters({ 
    context,
    showDescription,
    handleSortNoDescriptionChange,
    showIdeas,
    handleSortNoIdeasChange,
    handleSortNewChange,
    handleSortAlphaBeticalChange,
    searchQuery,
    handleSearchInputChange, 
}: FiltersProps) {
    
    const [expanded, setExpanded] = useState(false);
    
    const handleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <Box sx={{
            display: 'flexbox',
            flexDirection: 'row',
            width: '100%',
            backgroundColor: customTheme.palette.secondary.main,
            borderRadius: '15px',
            gap: '12px',
            marginBottom: '12px',
            flexWrap: 'wrap',
          }}>
            <SearchInput
                inputProps={{
                    style: {
                        margin: '0 10px',
                    },
                }}
                id={0}
                text={'Search'}
                value={searchQuery}
                error=""
                onChange={handleSearchInputChange || (() => {})}
                />
            <Button onClick={handleExpand}>
                {expanded ? (
                    <Text text={'Collapse Filters'} size={Size.medium}/>
                ) : (
                    <Text text={'Expand Filters'} size={Size.medium}/>
                )}
            </Button>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box sx={{
                    display: 'inline-flex',
                    flexDirection: { sm: 'row', xs: 'column' },
                    flexwrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '99%',
                    height: '100%',
                    margin: '12px',
                }}>
                    <FormControlLabel
                        control={
                            <FilterSwitch 
                            checked={showDescription} 
                            onChange={handleSortNoDescriptionChange} 
                            />
                        }
                        label={''}
                        sx={{color: customTheme.palette.primary.main}}
                    />
                    <Text text={"Show Description"} size={Size.small} sx={{color: 'white'}}/>
                    <FilterDivider/>
                    <FormControlLabel
                        control={
                            <FilterSwitch 
                                checked={showIdeas} 
                                onChange={handleSortNoIdeasChange}
                            />
                        }
                        label=""
                        sx={{color: customTheme.palette.primary.main}}
                    />
                    <Text text={"Show Ideas"} size={Size.small} sx={{color: 'white'}}/>
                    <FilterDivider/>
                    <FormControlLabel
                        control={
                            <FilterSwitch onChange={handleSortNewChange} />}
                        label=""
                        sx={{color: customTheme.palette.primary.main}}
                    />
                    <Text text={"Sort by New"} size={Size.small} sx={{color: 'white'}}/>
                    <FilterDivider/>
                    <FormControlLabel
                        control={
                            <FilterSwitch onChange={handleSortAlphaBeticalChange} />}
                        label=""
                        sx={{color: customTheme.palette.primary.main}}
                    />
                    <Text text={"Sort Alphabetically"} size={Size.small} sx={{color: 'white'}}/>
                    </Box>
            </Collapse>
          </Box>
    );
};

export default Filters;
