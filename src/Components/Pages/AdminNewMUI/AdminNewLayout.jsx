import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ForumIcon from '@mui/icons-material/Forum';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LogoutIcon from '@mui/icons-material/Logout';
import { isAuthenticated, logout as authLogout } from '../../../auth';
import AdminLoginForm from './AdminLoginForm';

const drawerWidth = 240;

const menuItems = [
  { label: 'Категории', icon: <CategoryIcon />, path: '/admin/categories' },
  { label: 'Разработчики', icon: <PeopleAltIcon />, path: '/admin/developers' },
  { label: 'Кейсы', icon: <WorkspacesIcon />, path: '/admin/cases' },
  { label: 'Заявки', icon: <ForumIcon />, path: '/admin/discussions' },
  { label: 'Магазин', icon: <StorefrontIcon />, path: '/admin/shop' },
];

function AdminNewLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    authLogout();
    setAuthenticated(false);
    navigate('/admin');
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Если не авторизован, показываем форму входа
  if (!authenticated) {
    return <AdminLoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ py: 3, px: 2 }}>
        <Box
          component="img"
          src="/images/headerLogo.png"
          alt="Alazar Studio"
          sx={{ width: '100%', height: 'auto' }}
        />
      </Box>
      <Divider />
      <List
        sx={{
          flexGrow: 1,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        {menuItems.map((item) => {
          const selected = location.pathname.startsWith(item.path);
          return (
            <ListItem
              key={item.path}
              disablePadding
              sx={{
                width: '100%',
                display: 'block',
              }}
            >
              <ListItemButton
                selected={selected}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  width: '100%',
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Выход" />
        </ListItemButton>
      </Box>
      <Divider />
      <Box sx={{ p: 2, textAlign: 'center', fontSize: 12, color: 'text.secondary' }}>
        © {new Date().getFullYear()} Alazar Studio
      </Box>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="admin folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminNewLayout;


