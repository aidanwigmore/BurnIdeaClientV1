import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
import { useAuth } from '@context/AuthContext';

import Tooltip from '@mui/material/Tooltip';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Text from '@materials/Text';
import IdeaBurnLogo from '@materials/IdeaBurnLogo';

import { Size } from '../types/Size';

interface HeaderProps {
  admin?: boolean;
  modalOverLayOpen: boolean;
  setModalOverLayOpen: () => void;
}

function Header({ modalOverLayOpen, setModalOverLayOpen, admin }: HeaderProps) {
  const navigate = useNavigate();

  const { customer } = useAuth();

  const handleClick = () => {
    if (admin && admin === true) {
      navigate(`/admin`);
    } else {
      navigate(`/`);
    }
  };

  const handleViewerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`/`);
  };

  const handleNavigateTeaBank = () => {
    navigate(`/http://teabankclient-d9c62f61e84a.herokuapp.com/`);
  };

  return (
    <Box
      sx={{
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '15px',
        justifyContent: 'space-between',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      }}>
      <Button
        onClick={handleClick}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          borderRadius: '15px',
        }}
      >
        <Box sx={{display: 'inline-flex', flexDirection: 'row', justifyContent: 'flex-start', width: '99%' }}>
          <IdeaBurnLogo admin={admin}/>
        </Box>
        <Box sx={{display: 'inline-flex', flexDirection: 'row', justifyContent: 'flex-end', width: '99%', gap: '0'}}>
          { customer && customer.givenName &&
            <>
              {
                admin && admin === true &&
                <Tooltip title="Navigate to Viewer page?" arrow>
                  <Button sx={{ color: 'white', fontSize: '12px', display: 'flex', flexDirection: 'column', paddingBottom: '10px' }} onClick={handleViewerClick}>
                    <NoAccountsIcon sx={{ width: '36px', height: '36px' }} />
                  </Button>
                </Tooltip>
              }
              <Text text={`Welcome, ${customer.givenName}.`} size={Size.small}/>
            </>
          }
        </Box>
      </Button>
    </Box>
  );
};

export default Header;
