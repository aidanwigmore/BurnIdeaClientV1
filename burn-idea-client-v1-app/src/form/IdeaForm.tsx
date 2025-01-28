import React, { useState, useCallback, useEffect } from 'react';

import { useIdeaContext } from '@context/IdeaContext';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Cancel from '@mui/icons-material/Cancel';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/CheckOutlined';

import Text from '@materials/Text';
import CustomInput from '@materials/CustomInput';
import FormButtonGroup from '@materials/FormButtonGroup';
import Switch from '@mui/material/Switch';

import customTheme from '../theme';

import Idea from '../types/Idea';
import { Size } from '../types/Size';

interface IdeaFormProps {
    idea?: Idea | null;
    handleResetIdea: () => void;
    handleCancel: () => void;
}
function IdeaForm({ idea, handleResetIdea, handleCancel }: IdeaFormProps) {
    const { fetchIdeas, updateIdea, createIdea } = useIdeaContext();
    
    const [renderEditDelete, setRenderEditDelete] = useState(true);

    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

    const handleRefresh = useCallback(async () => {
        fetchIdeas();
    }, []);

    const [newIdea, setNewIdea] = useState<Idea>({
        id: idea?.id || undefined,
        name: idea?.name || '',
        ideaDescription: idea?.ideaDescription || '',
        ideaDifficulty: idea?.ideaDifficulty || 0,
        visible: idea?.visible || true,
        image: idea?.image || '',
        dateCreated: idea?.dateCreated || new Date(),
    });

    useEffect(() => {
        if (idea) {
            setNewIdea(idea);
        }
    }, [idea]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleSetEdit = useCallback(() => {
        setRenderEditDelete(false);
        setEdit(!edit);
    }, [setEdit, edit]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewIdea(prevIdea => ({
            ...prevIdea,
            name: event.target.value
        }));
    };

    const handleVisibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewIdea(prevIdea => ({
            ...prevIdea,
            visible: event.target.checked
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewIdea(prevIdea => ({
                    ...prevIdea,
                    image: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewIdea(prevIdea => ({
            ...prevIdea,
            ideaDescription: event.target.value
        }));
    };

    const handleDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setNewIdea(prevIdea => ({
            ...prevIdea,
            ideaDifficulty: value
        }));
    };

    const handleSave = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            let response;
            if (newIdea.id === undefined) {
                const postData = {
                    ...newIdea,
                    visible: newIdea.visible,
                    image: newIdea.image,
                };
                createIdea(postData);
            } else {
                const putData = {
                    ...newIdea,
                    visible: newIdea.visible,
                    image: newIdea.image,
                };
                updateIdea(newIdea.id, putData);
            }
            handleCancel();
            handleRefresh();
            handleResetIdea();
        } catch (error) {
            console.error('Error saving idea:', error);
        }
    }, [newIdea, handleResetIdea, handleCancel, handleRefresh]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <CustomInput label={"Name"} value={newIdea.name || idea?.name || ''} onChange={handleNameChange} error={""} />
                <Switch checked={newIdea.visible} onChange={handleVisibleChange} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <CustomInput label={"Difficulty"} value={newIdea?.ideaDifficulty + "" || idea?.ideaDifficulty + ''} onChange={handleDifficultyChange} error={""} />
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
                        <CustomInput label={"Description"} value={newIdea.ideaDescription || (idea?.ideaDescription || '')} onChange={handleDescriptionChange} error={""} />
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
                <>
                    {(newIdea.image || idea?.image) && <img src={newIdea.image || (idea?.image)} alt="Image" style={{ width: '20%', height: '20%', marginRight: '10px' }} />}
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            backgroundColor: customTheme.palette.warning.light,
                            marginBottom: '10px',
                            textWrap: 'nowrap',
                            color: customTheme.palette.custom.white,
                        }}
                    >
                        {fileUrl ? 'Re-upload File' : 'Upload File'}
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                </>
            </Box>
            {!renderEditDelete ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <FormButtonGroup
                        texts={[
                            'Edit Product ',
                            'Delete Product',
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
                            'Save',
                            'Cancel',
                        ]}
                        actions={[handleSave, handleCancel]}
                        icons={[<Save />, <Cancel />]}
                        colours={[customTheme.palette.success.main, customTheme.palette.error.main]}
                    />
                </Box>
            )}
        </>
    );
}

export default IdeaForm;