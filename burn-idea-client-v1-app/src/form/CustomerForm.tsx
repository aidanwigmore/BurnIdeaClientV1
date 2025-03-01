import React, { useState, useCallback } from 'react';

import { useAuth } from '@context/AuthContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';

import Garbage from '@mui/icons-material/Delete';
import Cancel from '@mui/icons-material/Cancel';
import Edit from '@mui/icons-material/Edit';
import Minus from '@mui/icons-material/Remove';
import Plus from '@mui/icons-material/Add';
import Save from '@mui/icons-material/CheckOutlined';

import CustomCheckBox from '@materials/CustomCheckBox';
import TextArea from '@materials/TextArea';
import Text from '@materials/Text';
import CustomInput from '@materials/CustomInput';
import FormButtonGroup from '@materials/FormButtonGroup';

import customTheme from '../theme';

import Customer from '../types/Customer';

import { Size } from '../types/Size';

interface CustomerFormProps {
    customer?: Customer | null;
    handleResetCustomer: () => void;
    handleCancel: () => void;
}

function CustomerForm({ customer, handleResetCustomer, handleCancel }: CustomerFormProps) {
    const { updateCustomerDetails, register } = useAuth();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [renderEditDelete, setRenderEditDelete] = useState(true);

    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);
    const [sortNew, setSortNew] = useState<Boolean>(true);

    const [errors, setErrors] = useState({
        name: '',
        givenName: '',
        email: '',
        confirmPassword: '',
        phoneNumber: '',
    });

    const [newCustomer, setNewCustomer] = useState<Customer>({
        id: customer?.id || undefined,
        name: customer?.name || '',
        givenName: customer?.givenName || '',
        email: customer?.email || '',
        phoneNumber: customer?.phoneNumber || '',
        subscribedToNewsletter: customer?.subscribedToNewsletter || false,
        smsNotifications: customer?.smsNotifications || false,
        emailNotifications: customer?.emailNotifications || false,
        isActive: customer?.isActive || false,
        isStaff: customer?.isStaff || false,
        isSuperuser: customer?.isSuperuser || false,
    });

    const handleSetEdit = useCallback(() => {
        setRenderEditDelete(false);
        setEdit(!edit);
    }, [setEdit, edit]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCustomer(prevCustomer => ({
            ...prevCustomer,
            name: event.target.value
        }));
    };

    const handleGivenNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCustomer(prevCustomer => ({
            ...prevCustomer,
            givenName: event.target.value
        }));
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCustomer(prevCustomer => ({
            ...prevCustomer,
            email: event.target.value
        }));
    };

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCustomer(prevCustomer => ({
            ...prevCustomer,
            phoneNumber: event.target.value
        }));
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubscribedToNewsletterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCustomer(prevCustomer => ({
            ...prevCustomer,
            subscribedToNewsletter: event.target.checked,
        }));
    };
    
    const handleSmsNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCustomer(prevCustomer => ({
            ...prevCustomer,
            SmsNotifications: event.target.checked,
        }));
    };
    
    const handleEmailNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCustomer(prevCustomer => ({
            ...prevCustomer,
            emailNotifications: event.target.checked,
        }));
    };

    const handleSave = useCallback(() => {
        setRenderEditDelete(true);
        if (newCustomer.id === undefined) {
            const postData = {
                name: newCustomer.name, 
                email: newCustomer.email, 
                password: password,
                givenName: newCustomer.givenName, 
                phoneNumber: newCustomer.phoneNumber, 
                subscribedToNewsletter: false, 
                smsNotifications: false, 
                emailNotifications: false
            };
            register(
                postData.name,
                postData.email,
                postData.password,
                postData.givenName,
                postData.phoneNumber,
                postData.subscribedToNewsletter,
                postData.smsNotifications,
                postData.emailNotifications
            );
        } else if (customer?.id !== null) {
            const putData = {
                name: newCustomer.name,
                givenName: newCustomer.givenName,
                email: newCustomer.email,
                phoneNumber: newCustomer.phoneNumber,
                subscribedToNewsletter: newCustomer.subscribedToNewsletter,
                smsNotifications: newCustomer.smsNotifications,
                emailNotifications: newCustomer.emailNotifications,
                isActive: newCustomer.isActive,
                isStaff: newCustomer.isStaff,
                isSuperuser: newCustomer.isSuperuser,
            };
            updateCustomerDetails(newCustomer.id, putData);
        }
        handleCancel();
        handleResetCustomer();
    }, [newCustomer, handleResetCustomer, customer, handleCancel, password, register, updateCustomerDetails]);

    return (
        <>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                }}
            >
                <CustomInput label={"Name"} value={newCustomer.name || customer?.name || ''} onChange={handleNameChange} error={errors.name} />
                <CustomInput label={"Given Name"} value={newCustomer.givenName || customer?.givenName || ''} onChange={handleGivenNameChange} error={errors.givenName} />
            </Box>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                }}
            >
                <CustomInput label={"Email"} value={newCustomer.email || customer?.email || ''} onChange={handleEmailChange} error={errors.email} />
                <CustomInput label={"Phone Number"} value={newCustomer.phoneNumber || customer?.phoneNumber || ''} onChange={handlePhoneNumberChange} error={errors.phoneNumber} />
            </Box>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                }}
            >
                <CustomInput
                    label={"Password"}
                    value={password}
                    type={"password"}
                    onChange={handlePasswordChange}
                    error={''}
                />   
                <CustomInput
                    label={"Confirm Password"}
                    value={confirmPassword}
                    type={"password"}
                    onChange={handleConfirmPasswordChange}
                    error={errors.confirmPassword}
                />   
            </Box>
            <Text sx={{ width: '99%', textAlign: 'center' }} size={Size.small} text={"Password must be minimum 8 characters long, have 3 special characters and 3 numbers."} />
            <Box
                sx={{
                display: 'flex',
                width: '50%',
                marginLeft: 'auto',
                marginRight: 'auto',
                flexDirection: 'column',
                justifyContent: 'space-around',
                }}
            >
                <CustomCheckBox value={newCustomer.subscribedToNewsletter || customer?.subscribedToNewsletter || false} text={"Subscribed to the newsletter?"} handleChange={handleSubscribedToNewsletterChange} />
                <CustomCheckBox value={newCustomer.smsNotifications || customer?.smsNotifications || false} text={"SMS notifications?"} handleChange={handleSmsNotificationsChange} />
                <CustomCheckBox value={newCustomer.emailNotifications || customer?.emailNotifications || false} text={"Email notifications?"} handleChange={handleEmailNotificationsChange} />
            </Box>
            <FormButtonGroup
                texts={[
                'Create',
                'Cancel',
                ]}
                actions={[handleSave, () => { }]}
                icons={[<Save />, <Garbage/>]}
                colours={[customTheme.palette.success.main, customTheme.palette.error.main]}
            />
        </>
    );
}

export default CustomerForm;