import React, { useEffect, useState, useCallback } from 'react';

import { useAuth } from '@context/AuthContext';

import Box from '@mui/material/Box';
import Cancel from '@mui/icons-material/Cancel';
import Edit from '@mui/icons-material/Edit';
import Garbage from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/CheckOutlined';

import Alert from '@mui/material/Alert';
import CustomCheckBox from '@materials/CustomCheckBox';
import CustomInput from '@materials/CustomInput';
import FormButtonGroup from '@materials/FormButtonGroup';
import Snackbar from '@mui/material/Snackbar';

import Text from '@materials/Text';

import customTheme from '../theme';

import Customer from '../types/Customer';
import { Size } from '../types/Size';

interface AccountFormProps {
    handleNavigation: (url: string | undefined) => void;
}

function AccountForm({ handleNavigation }: AccountFormProps) {
    const { customer, fetchCustomerDetails, updateCustomerDetails, error } = useAuth();
    const [updatedCustomer, setUpdatedCustomer] = useState<Customer>(customer || {
        name: '',
        givenName: '',
        email: '',
        phoneNumber: '',
        subscribedToNewsletter: false,
        smsNotifications: false,
        emailNotifications: false,
        isActive: false,
        isStaff: false,
        isSuperuser: false,
    }
    );

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [renderEditDelete, setRenderEditDelete] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">('error');

    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);
    const [cancel, setCancel] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedCustomer(prevCustomer => ({
            ...prevCustomer,
            name: event.target.value
        }));
    };
    
    const [errors, setErrors] = useState({
        name: '',
        givenName: '',
        email: '',
        confirmPassword: '',
        phoneNumber: '',
    });

        const handleGivenNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedCustomer(prevCustomer => ({
                ...prevCustomer,
                givenName: event.target.value
            }));
        };
    
        const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedCustomer(prevCustomer => ({
                ...prevCustomer,
                email: event.target.value
            }));
        };
    
        const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedCustomer(prevCustomer => ({
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
            setUpdatedCustomer(prevCustomer => ({
                ...prevCustomer,
                subscribedToNewsletter: event.target.checked,
            }));
        };
        
        const handleSmsNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedCustomer(prevCustomer => ({
                ...prevCustomer,
                SmsNotifications: event.target.checked,
            }));
        };
        
        const handleEmailNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedCustomer(prevCustomer => ({
                ...prevCustomer,
                emailNotifications: event.target.checked,
            }));
        };

    useEffect(() => {
        fetchCustomerDetails();
      }, []);

    const handleUpdate = async () => {
    try {
        updatedCustomer !== null &&
        await updateCustomerDetails(`${customer?.id}`, updatedCustomer);
        setSnackbarMessage('Customer details updated successfully.');
        setSeverity('success');
        setSnackbarOpen(true);
    } catch (err) {
        setSnackbarMessage('Failed to update customer details.');
        setSeverity('error');
        setSnackbarOpen(true);
    }
    };

    return (
        <>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                }}
            >
                <CustomInput label={"Name"} value={updatedCustomer?.name || customer?.name || ''} onChange={handleNameChange} error={errors.name} />
                <CustomInput label={"Given Name"} value={updatedCustomer?.givenName || customer?.givenName || ''} onChange={handleGivenNameChange} error={errors.givenName} />
            </Box>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                }}
            >
                <CustomInput label={"Email"} value={updatedCustomer?.email || customer?.email || ''} onChange={handleEmailChange} error={errors.email} />
                <CustomInput label={"Phone Number"} value={updatedCustomer?.phoneNumber || customer?.phoneNumber || ''} onChange={handlePhoneNumberChange} error={errors.phoneNumber} />
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
                <CustomCheckBox value={updatedCustomer.subscribedToNewsletter || customer?.subscribedToNewsletter || false} text={"Subscribed to the newsletter?"} handleChange={handleSubscribedToNewsletterChange} />
                <CustomCheckBox value={updatedCustomer.smsNotifications || customer?.smsNotifications || false} text={"SMS notifications?"} handleChange={handleSmsNotificationsChange} />
                <CustomCheckBox value={updatedCustomer.emailNotifications || customer?.emailNotifications || false} text={"Email notifications?"} handleChange={handleEmailNotificationsChange} />
            </Box>
            <FormButtonGroup
                texts={[
                'Update',
                'Cancel',
                ]}
                actions={[handleUpdate, () => { }]}
                icons={[<Save />, <></>]}
                colours={[customTheme.palette.success.main, customTheme.palette.error.main]}
            />
        </>
    );
}

export default AccountForm;
