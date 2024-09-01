import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { AppBar, Toolbar, styled, Button, Box, Avatar } from '@mui/material'; 

const Component = styled(AppBar)`
    background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTObuEpyAHN2mmT8BWXeCoMIz_F1kyOdrCJjA&s);
    background-repeat: no-repeat;
    background-size: cover;
    color: black;
`;

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: '10px 20px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '16px',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const Container = styled(Toolbar)`
    justify-content: space-between;
`;

const LinksContainer = styled(Box)`
    display: flex;

    & > button {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
`;

const AccountContainer = styled(Box)`
    display: flex;
    align-items: center;
    & > *:not(:last-child) {
        margin: 8px;
    }
`;

const StyledAvatar = styled(Avatar)`
    margin-right: 8px;
`;

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Use the useLocation hook here
    const userEmail = location.state?.userEmail || "";
    const userName = location.state?.userName || "";

    const logout = async () => {
        // Perform any logout logic here (e.g., clear session, etc.)
        // Then reload the page
        window.location.reload();
    }

    // Get the initials from the username
    const getInitials = (name) => {
        return name.split(' ')
                   .map(part => part.charAt(0).toUpperCase())
                   .join('');
    };

    const handleViewHistory = () => {
        console.log({userEmail});
        navigate('/particular_history', { state: { userEmail } });
    };

    return (
        <Component>
            <Container>
                <LinksContainer>
                    <Button onClick={handleViewHistory}>INVOICE HISTORY</Button>
                    <Button onClick={logout}>LOGOUT</Button>
                </LinksContainer>
                <AccountContainer>
                    <StyledAvatar>{getInitials(userName)}</StyledAvatar>
                </AccountContainer>
            </Container>
        </Component>
    );
};

export default Header;
