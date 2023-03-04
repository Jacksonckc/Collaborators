import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['My Posts', 'My Connections'];
const settings = ['Profile', 'Favorites', 'Skills', 'Logout'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate('/profile');
  };
  const handleGoToMyConnections = () => {
    navigate('/myConnections');
  };
  const handleGoToMyPosts = () => {
    navigate('/myPosts');
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}>
            Feed
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}>
              <MenuItem key={pages[0]} onClick={handleGoToMyPosts}>
                <Typography textAlign='center'>{pages[0]}</Typography>
              </MenuItem>
              <MenuItem key={pages[1]} onClick={handleGoToMyConnections}>
                <Typography textAlign='center'>{pages[1]}</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}>
            Feed
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key={pages[0]}
              onClick={handleGoToMyPosts}
              sx={{ my: 2, color: 'white', display: 'block' }}>
              {pages[0]}
            </Button>
            <Button
              key={pages[1]}
              onClick={handleGoToMyConnections}
              sx={{ my: 2, color: 'white', display: 'block' }}>
              {pages[1]}
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Profile'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <MenuItem key={settings[0]} onClick={handleGoToProfile}>
                <Typography textAlign='center'>{settings[0]}</Typography>
              </MenuItem>
              <MenuItem key={settings[1]}>
                <Typography textAlign='center'>{settings[1]}</Typography>
              </MenuItem>
              <MenuItem key={settings[2]}>
                <Typography textAlign='center'>{settings[2]}</Typography>
              </MenuItem>
              <MenuItem key={settings[3]} onClick={handleLogout}>
                <Typography textAlign='center'>{settings[3]}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
