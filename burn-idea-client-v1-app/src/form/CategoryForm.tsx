import React, { useState, useCallback } from 'react';

import { useCategoryContext } from '@context/CategoryContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';

import Cancel from '@mui/icons-material/Cancel';
import Edit from '@mui/icons-material/Edit';
import Minus from '@mui/icons-material/Remove';
import Plus from '@mui/icons-material/Add';
import Save from '@mui/icons-material/CheckOutlined';

import Text from '@materials/Text';
import CustomInput from '@materials/CustomInput';
import FormButtonGroup from '@materials/FormButtonGroup';

import customTheme from '../theme';

import Category from '../types/Category';
import Idea from '../types/Idea';

import { Size } from '../types/Size';

interface CategoryFormProps {
    category?: Category | null;
    ideas?: Idea[] | null;
    handleResetCategory: () => void;
    handleCancel: () => void;
}

function CategoryForm({ category, ideas, handleResetCategory, handleCancel }: CategoryFormProps) {
    const { fetchCategories, updateCategory, createCategory } = useCategoryContext();
    
    const [renderEditDelete, setRenderEditDelete] = useState(true);

    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);
    const [sortNew, setSortNew] = useState<Boolean>(true);

    const [newCategory, setNewCategory] = useState<Category>({
        id: category?.id || undefined,
        name: category?.name || '',
        categoryDescription: category?.categoryDescription || '',
        visible: category?.visible || true,
        color: category?.color || '',
        ideas: category?.ideas || [],
    });

    const handleSetEdit = useCallback(() => {
        setRenderEditDelete(false);
        setEdit(!edit);
    }, [setEdit, edit]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(prevCategory => ({
            ...prevCategory,
            name: event.target.value
        }));
    };

    const handleVisibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(prevCategory => ({
            ...prevCategory,
            visible: event.target.checked
        }));
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(prevCategory => ({
            ...prevCategory,
            categoryDescription: event.target.value
        }));
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(prevCategory => ({
            ...prevCategory,
            color: event.target.value
        }));
    };

    const handleIdeaChange = (idea: Idea) => {
        if (idea.id) {
            const ideaId = parseInt(idea.id, 10);
            setNewCategory(prevCategory => ({
                ...prevCategory,
                ideas: [...prevCategory.ideas, ideaId]
            }));
        }
    };

    const handleAddIdea = (idea: Idea) => {
        if (idea.id) {
            const ideaId = parseInt(idea.id, 10);
            setNewCategory(prevCategory => ({
                ...prevCategory,
                ideas: [...prevCategory.ideas, ideaId]
            }));
        }
    };

    const handleRemoveIdea = (idea: Idea) => {
        if (idea.id) {
            const ideaId = parseInt(idea.id, 10);
            setNewCategory(prevCategory => ({
                ...prevCategory,
                ideas: prevCategory.ideas.filter((idea) => idea !== ideaId)
            }));
        }
    };

    const handleRefresh = useCallback(async () => {
        fetchCategories();
    }, []);

    const handleSave = useCallback(() => {
        setRenderEditDelete(true);
        if (newCategory.id === undefined) {
            const postData = {
                name: newCategory.name,
                visible: newCategory.visible,
                categoryDescription: newCategory.categoryDescription,
                color: newCategory.color,
                ideas: newCategory.ideas,
            };
            createCategory(postData);
        } else if (category?.id !== null) {
            const putData = {
                name: newCategory.name,
                visible: newCategory.visible,
                categoryDescription: newCategory.categoryDescription,
                color: newCategory.color,
                ideas: newCategory.ideas,
            };
            updateCategory(newCategory.id, putData);
        }
        handleCancel();
        handleResetCategory();
        handleRefresh();
    }, [newCategory, handleResetCategory, category, handleCancel, handleRefresh]);

    return (
        <Box
            sx={{
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <CustomInput label={"Name"} value={newCategory.name || category?.name || ''} onChange={handleNameChange} error={""} />
                <Switch checked={newCategory.visible} onChange={handleVisibleChange} />
            </Box>
            <Box
                sx={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        width: '80%', 
                        backgroundColor: customTheme.palette.primary.light,
                        padding: '10px',
                        borderRadius: '10px',
                    }}
                >
                    <>
                        <CustomInput label={"Description"} value={newCategory.categoryDescription || (category?.categoryDescription || '')} onChange={handleDescriptionChange} error={""} />
                    </>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <Text
                    size={Size.small}
                    text={"Colour"}
                />
                <input
                    type="color"
                    value={newCategory.color || (category?.color || "#000000")}
                    onChange={handleColorChange}
                />
            </Box>
            <Box
                sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '50%',
                }}
            >
                <Text
                    size={Size.small}
                    text={"Add / Remove Ideas"}
                />
                <Divider sx={{ borderBottomWidth: 2, marginBottom: '10px', borderColor: 'success' }} />
                {
                    ideas?.map((idea) => {
                        if (idea.id !== undefined) {
                            const ideaId = parseInt(idea.id, 10);
                            if (!isNaN(ideaId) && category && category.ideas) {
                                if (category.ideas.includes(ideaId)) {
                                    return (
                                        <Box key={`add-idea-box-${idea.id}`} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Box
                                                sx={{
                                                    display: 'flex', flexDirection: 'row'
                                                }}
                                            >
                                                <Text
                                                    size={Size.small}
                                                    text={`${idea.id}-"${idea.name}"-${idea.ideaDifficulty}-${idea.visible}`}
                                                />
                                            </Box>
                                            <Button id={`add-idea-button-${idea.id}`} color={"warning"} onClick={() => handleRemoveIdea(idea)}><Minus /></Button>
                                        </Box>
                                    );
                                } else {
                                    return (
                                        <Box key={`remove-idea-box-${idea.id}`} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Box
                                                sx={{
                                                    display: 'flex', flexDirection: 'row'
                                                }}
                                            >
                                                <Text
                                                    size={Size.small}
                                                    text={`${idea.id}-"${idea.name}"-${idea.ideaDifficulty}-${idea.visible}`}
                                                />
                                            </Box>
                                            <Button sx={{ justifyContent: 'flex-end' }} id={`remove-idea-button-${idea.id}`} color={"success"} onClick={() => handleAddIdea(idea)}><Plus /></Button>
                                        </Box>
                                    );
                                }
                            }
                        }
                        return null;
                    })
                }
            </Box>

            {!renderEditDelete === true ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FormButtonGroup
                        texts={[
                            'Edit Address ',
                            'Delete Address',
                        ]}
                        actions={[handleSetEdit]}
                        icons={[<Edit />]}
                        colours={[customTheme.palette.success.main, customTheme.palette.error.main]}
                    />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FormButtonGroup
                        texts={[
                            'Save Changes',
                            'Cancel Changes',
                        ]}
                        actions={[handleSave, handleCancel]}
                        icons={[<Save />, <Cancel />]}
                        colours={[customTheme.palette.success.main, customTheme.palette.error.main]}
                    />
                </Box>
            )}
        </Box>
    );
}

export default CategoryForm;