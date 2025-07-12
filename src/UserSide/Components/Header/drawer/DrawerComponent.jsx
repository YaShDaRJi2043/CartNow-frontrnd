import React from "react";
import "./DrawerComponent.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { NavLink, useNavigate } from "react-router-dom";
import BASE_URL from "../../../../services/Helper";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../../../store/features/authSlice";
import { resetCart } from "../../../../store/features/cartSlice";

const DrawerComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, userToken } = useSelector((state) => state.auth);

  const [drawerState, setDrawerState] = React.useState({});

  const logout = async () => {
    try {
      await BASE_URL.get("/user/auth/logout", {
        headers: { Authorization: userToken },
      });
      dispatch(userLogout());
      dispatch(resetCart());
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const drawerContent = (anchor) => (
    <Box
      width="360px"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      <div className="drawer-header">
        <Avatar className="drawer-avatar">
          {user ? user.name[0].toUpperCase() : ""}
        </Avatar>
        <div className="drawer-header-text">
          {user ? `Hello, ${user.name}` : "Hello, Sign in"}
        </div>
      </div>

      <List>
        <div className="drawer-section-title">Shop By Category</div>
      </List>

      <NavLink to="/mobile" className="drawer-link">
        <List>
          <ListItemButton>Mobiles</ListItemButton>
        </List>
      </NavLink>

      <NavLink to="/electronic" className="drawer-link">
        <List>
          <ListItemButton>Electronics</ListItemButton>
        </List>
      </NavLink>

      <NavLink to="/men" className="drawer-link">
        <List>
          <ListItemButton>Men's Fashion</ListItemButton>
        </List>
      </NavLink>

      <NavLink to="/women" className="drawer-link">
        <List>
          <ListItemButton>Women's Fashion</ListItemButton>
        </List>
      </NavLink>

      <NavLink to="/homekitchen" className="drawer-link">
        <List>
          <ListItemButton>Home, Kitchen</ListItemButton>
        </List>
      </NavLink>

      <Divider />

      <List>
        <div className="drawer-section-title">Help & Setting</div>
      </List>

      <NavLink to="/orders" className="drawer-link">
        <List>
          <ListItemButton>Your Orders</ListItemButton>
        </List>
      </NavLink>

      <NavLink to="/feedback" className="drawer-link">
        <List>
          <ListItemButton>Feedback</ListItemButton>
        </List>
      </NavLink>

      <List>
        <ListItemButton>
          {userToken ? (
            <button className="drawer-sign-btn" onClick={logout}>
              Sign Out
            </button>
          ) : (
            <NavLink to="/signin">
              <button className="drawer-sign-btn">Sign In</button>
            </NavLink>
          )}
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)} className="drawer-button">
            <div className="menu-icon">
              <MenuIcon />
            </div>
            <div>All</div>
          </div>
          <Drawer
            open={drawerState[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {drawerContent(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default DrawerComponent;
