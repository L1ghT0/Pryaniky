import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Drawer, Menu, MenuItem} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {useNavigate} from "react-router";
import {logout} from "../../store/reducers/authReducer";

function Header() {
    const navigate = useNavigate();
    const {isAuthorized} = useSelector((store: RootState) => store.auth);
    const [anchorProfileEl, setAnchorProfileEl] = React.useState<null | HTMLElement>(null);
    const [anchorMainMenu, setAnchorMainMenu] = React.useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch();

    const handleHomeClick = () => {
        handleCloseMainMenu();
        navigate('/')
    }
    const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorProfileEl(event.currentTarget);
    };
    const handleCloseProfileMenu = () => {
        setAnchorProfileEl(null);
    };
    const handleMainMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorMainMenu(event.currentTarget)
    }
    const handleCloseMainMenu = () => {
        setAnchorMainMenu(null);
    }
    const handleLogin = () => {
        navigate('/login')
    }
    const handleLogout = () => {
        dispatch(logout())
        setAnchorProfileEl(null);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar sx={{
                    justifyContent: 'space-between', maxWidth: '1440px',
                    margin: ' 0 auto',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    <Box sx={{display: {xs: 'flex', sm: 'none'},}}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            onClick={handleMainMenu}
                            sx={{display: {xs: 'flex', sm: 'none'}}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Drawer
                            anchor='top'
                            open={Boolean(anchorMainMenu)}
                            onClose={handleCloseMainMenu}
                            sx={{}}
                        >
                            <MenuItem onClick={handleHomeClick} sx={{flexGrow: 1}}>HOME</MenuItem>
                        </Drawer>
                    </Box>
                    <Button color="inherit" sx={{display: {xs: 'none', sm: 'flex'}, cursor: 'pointer'}} onClick={handleHomeClick}>HOME</Button>
                    {!isAuthorized ? <Button color="inherit" sx={{}} onClick={handleLogin}>Login</Button> :
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleProfileMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorProfileEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorProfileEl)}
                                onClose={handleCloseProfileMenu}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;