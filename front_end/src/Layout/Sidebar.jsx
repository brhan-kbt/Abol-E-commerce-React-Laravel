import React from 'react'
import logo from '../assets/tlogo1.png';

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  StoreMallDirectory,
  Store,
  RecentActors,
  DeliveryDiningOutlined,
  CoffeeMakerOutlined,
  SubscriptionsOutlined,
  Subscriptions,
  ReviewsOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from '../components/FlexBetween';

const navItems = [
    {
      id:1,
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      id:2,
      text: "Users Module",
      icon: null,
    },
    {
      id:3,
      text: "Overview",
      icon: <PointOfSaleOutlined />,
    },
    
    {
      id:4,
      text: "Users",
      icon: <Groups2Outlined />,
    },
    
    {
      id:7,
      text: "Order Module",
      icon: null,
    },
    {
      id:8,
      text: "Overview",
      icon: <PointOfSaleOutlined />,
    },
    {
      id:9,
      text: "Order",
      icon: <RecentActors />,
    },
    {
      id:10,
      text: "Payment",
      icon: <ReceiptLongOutlined />,
    },
    {
        id:10,
        text: "Delivery",
        icon: <DeliveryDiningOutlined />,
      },
    {
      id:11,
      text: "Product Module",
      icon: null,
    },
    {
      id:12,
      text: "Overview",
      icon: <PointOfSaleOutlined />,
    },
    {
      id:13,
      text: "Coffee",
      icon: <CoffeeMakerOutlined />,
    },
    {
      id:14,
      text: "Subscription",
      icon: <SubscriptionsOutlined />,
    },
    {
        id:100,
        text: "Advertisement",
        icon: <Subscriptions />,
      },

      {
        id:100,
        text: "Review & Rating",
        icon: <ReviewsOutlined />,
      },
   
   
    {
      id:23,
      text: "Management",
      icon: null,
    },
    {
      id:24,
      text: "Admin",
      icon: <AdminPanelSettingsOutlined />,
    },
    {
      id:25,
      text: "Performance",
      icon: <TrendingUpOutlined />,
    },
  ];
  const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
  }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();
  
    useEffect(() => {
      setActive(pathname.substring(1));
    }, [pathname]);
  
    return (
      <Box component="nav" sx={{backgroundColor:'gray'}}>
        {isSidebarOpen && (
          <Drawer
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            variant="persistent"
            anchor="left"
            sx={{
              width: drawerWidth,
              "& .MuiDrawer-paper": {
                backgroundColor: '#F2ECE6',
                boxSixing: "border-box",
                borderWidth: isNonMobile ? 0 : "0px",
                width: drawerWidth,
              },
            }}
          >
            <Box width="100%">
              <Box m="1.5rem 2rem 2rem 3rem">
                <FlexBetween color={theme.palette.secondary[0]}>

                  <Box display="flex" alignItems="center" gap="0.5rem">
                    <Typography variant="h6" fontWeight="bold" alignItems='center' className='text-primary'>
                     <img src={logo} alt=""  className='h-15'/>
                    </Typography>
                  </Box>
                  {!isNonMobile && (
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                      <ChevronLeft />
                    </IconButton>
                  )}
                </FlexBetween>
              </Box>
              <List>
                {navItems.map(({ text, icon,id }) => {
                  if (!icon) {
                    return (
                      <Typography key={id} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                        {text}
                      </Typography>
                    );
                  }
                  const lcText = text.toLowerCase();
  
                  return (
                    <ListItem key={id} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText
                              ? '#C68650'
                              : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[0],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[0],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
  
            {/* <Box position="absolute" bottom="2rem">
              <Divider />
              <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.secondary[0] }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[0] }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[0],
                    fontSize: "25px ",
                  }}
                />
              </FlexBetween>
            </Box> */}
          </Drawer>
        )}
      </Box>
    );
};
  


export default Sidebar