import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Box, Menu } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState('');
  const navigate = useNavigate();

  const handleMenuOpen = (event, type) => {
    setAnchorEl(event.currentTarget);
    setMenuType(type);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuType('');
  };

  const handleVerProyectos = () => {
    navigate("/proyectos")
  }

  const handleCrearProyecto = () => {
    navigate("/cproyecto")
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItemStyle = {
    fontSize: '13px',
    color: 'black',
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#fafafa', color: 'black' }}>
      <Toolbar sx={{ padding: '0 8px', alignItems: 'center', minHeight: '45px' }}>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Typography
            variant="body2"
            onClick={(e) => handleMenuOpen(e, 'academics')}
            sx={{ cursor: 'pointer', fontSize: '13px', color: 'black', marginRight: '16px' }}
          >
            Proyectos Vinculación
            <KeyboardArrowDownRoundedIcon fontSize='small' sx={{ verticalAlign: 'middle', mr: 1 }} />
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && menuType === 'academics'}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleVerProyectos} sx={menuItemStyle}>Ver Proyectos</MenuItem>
            <MenuItem onClick={handleCrearProyecto} sx={menuItemStyle}>Crear Nuevo Proyecto</MenuItem>        
          </Menu>

          <Typography
            variant="body2"
            onClick={(e) => handleMenuOpen(e, 'reports')}
            sx={{ cursor: 'pointer', fontSize: '13px', color: 'black' }}
          >
            Reportes
            <KeyboardArrowDownRoundedIcon fontSize='small' sx={{ verticalAlign: 'middle', mr: 1 }} />
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && menuType === 'reports'}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleMenuClose} sx={menuItemStyle}>Reporte 1</MenuItem>
            <MenuItem onClick={handleMenuClose} sx={menuItemStyle}>Reporte 2</MenuItem>
          </Menu>
        </Box>

        <IconButton
          edge="end"
          color="inherit"
          onClick={(e) => handleMenuOpen(e, 'user')}
          sx={{ color: 'black', padding: '0 8px' }}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && menuType === 'user'}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleLogout} sx={menuItemStyle}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
