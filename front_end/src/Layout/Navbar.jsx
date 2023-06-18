import React,{useState} from 'react'
import logo from '../assets/toplogo.png';

import {
   LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
    LogoutOutlined,
    Person,
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
import { useStateContext } from '../contexts/ContextProvider';

  const Navbar = ({isSidebarOpen, setIsSidebarOpen }) => {
    const router=useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleLogout = () => {
      localStorage.removeItem('abol_token')
       router('/login');
       window.location.reload(); // Force page reload
    }
    const handleSetting = () => {
      // localStorage.removeItem('abol_token')
      //  router('/login');
    }
    
    const handleClose = () => {
      setAnchorEl(null);
      // localStorage.removeItem('abol_token')
      //  router('/login');
    }

   const {currentUser,setCurrentUser} = useStateContext();

   const storedUser = currentUser;
   
   console.log(storedUser);
   console.log(storedUser.username);
 

    
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
                alt="profile"
                height="32px"
                width="32px"
                border='1px solid black'
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              >
                <Person/>
                </Box>
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                //   sx={{ color: theme.palette.secondary[0] }}
                >
                  {storedUser.username}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                //   sx={{ color: theme.palette.secondary[0] }}
                >
                  {/* {storedUser.role_id} */}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                // sx={{ color: theme.palette.secondary[0], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              onClick={handleClose}
              open={isOpen}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              {/* <MenuItem onClick={handleSetting}><SettingsOutlined sx={{mr:'1rem'}}/> Settings</MenuItem> */}
              <MenuItem onClick={handleLogout}><LogoutOutlined sx={{mr:'1rem'}}/>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar