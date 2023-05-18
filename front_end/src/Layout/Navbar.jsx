import React,{useState} from 'react'
import logo from '../assets/toplogo.png';

import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
  } from "@mui/icons-material";

import {
    AppBar,
    Button,
    Box,
    Typography,
    IconButton,
    InputBase,
    Toolbar,
    Menu,
    MenuItem,
    useTheme,
  } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../components/FlexBetween';

  const Navbar = ({isSidebarOpen, setIsSidebarOpen }) => {
    const router=useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => {
      setAnchorEl(null);
      localStorage.removeItem('aboltoken')
    //   router('/login');
    }
    
  return (
    <AppBar
      sx={{
        position: "static",
        backgroundColor:'#F2ECd4',
        boxShadow: "2px",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            borderRadius="9px"
            border='1px solid black'
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase  placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton >
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={logo}
                height="32px"
                width="32px"
                border='1px solid black'
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                //   sx={{ color: theme.palette.secondary[0] }}
                >
                  Berhanu
                </Typography>
                <Typography
                  fontSize="0.75rem"
                //   sx={{ color: theme.palette.secondary[0] }}
                >
                  Software Developer
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                // sx={{ color: theme.palette.secondary[0], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar