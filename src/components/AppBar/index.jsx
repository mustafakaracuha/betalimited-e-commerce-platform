import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import AccountCircle from "@mui/icons-material/AccountCircle";

import Basket from '../Basket'
import Search from "../Search";
import Badge from '../Basket/Badge'

import logo from "../../assets/logo/logo-light.png";
import { logout } from "../../store/features/auth/authSlice";
import { clearMyProducts } from "../../store/features/basket/basketSlice";

import { Link } from "react-router-dom";

function index() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { userName, sessionId } = useSelector((state) => state.auth);
  const [ openBasket, setOpenBasket ] = useState(false) ;


  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearMyProducts());
  };

  const handleOpenCard = () => {
    setOpenBasket(true)
  }

  return (
    <Box sx={{ flexGrow: 1 }} className="w-full px-6 fixed top-0 z-50">
      <AppBar position="static" className="rounded-3xl pb-2 mt-3">
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
            className="flex items-center justify-start"
          >
            <img src={logo} className="mr-2" width={160} />{" "}
            <span className="mt-2 font-bold max-sm:hidden">Fruiterer</span>
          </Typography>
          <Search />
          {sessionId ? (
            <div className="flex items-center justify-center">
              <p className="capitalize max-sm:hidden">{userName}</p>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenCard}
                color="inherit"
              >
               <Badge/>
              </IconButton>
               <Basket open={openBasket} setOpenBasket={setOpenBasket }/>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "bottom",
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/" className="text-lg">
              Login
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default index;
