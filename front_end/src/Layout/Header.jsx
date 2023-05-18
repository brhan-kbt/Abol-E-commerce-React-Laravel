import { Add } from "@mui/icons-material";
import { Typography, Box, useTheme, Button } from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "../components/FlexBetween";

const Header = ({ title, subtitle,onButtonClick }) => {


  const handleOpenDialog=()=>{
    onButtonClick();
  }
 
  const theme = useTheme();
  return (
    <FlexBetween display="flex">
    <Box>
      <Typography
        variant="h5"
        color={theme.palette.secondary[0]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="p" color={theme.palette.secondary[0]}>
        {subtitle}
      </Typography>

    </Box>
    <Box>
        {onButtonClick ? (
          <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
           <Add sx={{marginRight:1}}/>
            Add 
          </Button>
    ) : null}
   
    
    </Box>
    </FlexBetween>

    
  );
};

export default Header;
