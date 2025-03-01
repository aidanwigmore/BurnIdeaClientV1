import React, { useState, useCallback } from 'react';

import { useAuth } from '@context/AuthContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

import CustomTable from '@materials/CustomTable';
import Text from '@materials/Text';

import CustomerForm from '@form/CustomerForm';

import Customer from '../types/Customer';

import { Size } from '../types/Size';

interface AdminCustomersModalProps {
    customers: Customer[] | null,
    handleNavigation: (url: string | undefined) => void;
}

function AdminCustomersModal({ customers, handleNavigation }: AdminCustomersModalProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [newCustomer, setNewCustomer] = useState<Customer | null>(null);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleEdit = (customer: Customer) => {
        setSelectedCustomer(customer);
    };

    const handleCancel = () => {
        setSelectedCustomer(null);
        setNewCustomer(null);
    };

    const filteredCustomers = customers?.filter((customer) => {
        const searchQueryLowerCase = searchQuery.toLowerCase();
        const searchQueryNumber = Number(searchQueryLowerCase);
        return (
            customer.id?.toString().toLowerCase().includes(searchQueryLowerCase) ||
            customer.name?.toLowerCase().includes(searchQueryLowerCase) ||
            customer.phoneNumber?.includes(searchQueryLowerCase) || 
            customer.email?.toLowerCase().includes(searchQueryLowerCase) ||
            customer.givenName?.toLowerCase().includes(searchQueryLowerCase)
        );
    });
    
    // const handleRefresh = useCallback(async () => {
    //     fetchFaqs();
    // }, []);

    // const handleDelete = useCallback((customer: Customer) => {
    //     deleteCustomer(customer.id ?? '');
    //     handleResetCustomer();
    // }, [handleResetFaq, handleRefresh]);

    const transformedCustomers = filteredCustomers?.map((customer) => ({
        id: customer.id || '',
        extraData: [
            customer.id || '',
            customer.name,
            customer.givenName,
            customer.email,
            customer.phoneNumber,
        ],
        actions: (
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Button
                    onClick={() => handleEdit(customer)}
                    variant="contained"
                    color="success"
                    sx={{ margin: '5px' }}
                >
                    <Text text={"Edit"} size={Size.small}/>
                </Button>
                {/* <Button
                    onClick={() => handleDelete(faq)}
                    variant="contained"
                    color="error"
                    sx={{ margin: '5px' }}
                >
                    <Text text={"Delete"} size={Size.small}/>
                </Button> */}
            </Box>
        ),
    })) || [];

    return (
        <Card
            sx={{
                marginLeft: 'auto',
                marginRight: 'auto',
                height: '85vh',
                width: '80vw',
                overflow: 'auto',
            }}
        >
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Text size={Size.large} text={"Customers"} />
            </Box>
            <Divider />
            {(selectedCustomer || newCustomer) ? (
                <>
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <Text text={selectedCustomer?.id ? `Edit Customer '${selectedCustomer.id}':` : 'Create Customer:'} size={Size.large}/>
                    </Box>
                    <Box>
                        <CustomerForm
                            customer={selectedCustomer ?? newCustomer}
                            handleCancel={handleCancel}
                            handleResetCustomer={() => {}}
                        />
                    </Box>
                </>
            ) : (
                <Button sx={{ marginLeft: '12px' }} color="success" variant="contained" onClick={() => setNewCustomer({ name: '', givenName: '', email: '', phoneNumber: '', subscribedToNewsletter : false, smsNotifications: false, emailNotifications: false, isActive: true, isStaff: false, isSuperuser: false })}>
                    <Text text={"New Customer"} size={Size.small}/>
                </Button>
            )}
            <Box sx={{ width: '100%', textAlign: 'center', marginTop: '24px' }}>
                <TextField
                    label="Search Customers"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    sx={{ marginBottom: '20px', width: '50vw', marginLeft: 'auto', marginRight: 'auto' }}
                />
            </Box>
            <CustomTable
                columns={["ID", "name", "given name", "email", 'phone number', "actions"]}
                data={transformedCustomers ?? []}
            />
        </Card>
    );
}

export default AdminCustomersModal;
