import React, { useState, useEffect, useContext } from "react";
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
import { LoginDataContext } from "../../context/ContextProvider";

const DrawerComponent = () => {
  const { loginDataCalled, setLoginDataCalled } = useContext(LoginDataContext);

  const PageNavigate = useNavigate();

  const [userData, setUserData] = useState(null);

  const Token = localStorage.getItem("usertoken");

  const getUserDetail = async () => {
    try {
      const getUserData = await BASE_URL.get("/getCurrentLoginUserDetail", {
        headers: {
          Authorization: Token,
        },
      });
      setUserData((await getUserData)?.data);
      loginDataCalled(false);
    } catch {
      setUserData(null);
    }
  };

  const logout = async () => {
    await BASE_URL.get("/logout", {
      headers: {
        Authorization: Token,
      },
    }).then(localStorage.clear(), PageNavigate("/"), setLoginDataCalled(true));
  };

  useEffect(() => {
    if (loginDataCalled === true) {
      getUserDetail();
    }
  });

  const [state, setState] = useState({});

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      width="360px"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      <div className="drawerHeaderDiv">
        <div>
          {userData ? (
            <Avatar className="avatarIcon">
              {userData.name[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className="avatarIcon"></Avatar>
          )}
        </div>
        <div className="HeaderTxt">
          {userData ? (
            <>
              <div>Hello, {userData.name} </div>
            </>
          ) : (
            <>
              <div>Hello, Sign in</div>
            </>
          )}
        </div>
      </div>

      <List>
        <div className="categoriesHeading">Shop By Category</div>
      </List>

      <NavLink to="/mobile" className="drawerCategories">
        <List>
          <ListItemButton>Mobiles</ListItemButton>
        </List>
      </NavLink>

      <NavLink to="/electronic" className="drawerCategories">
        <List>
          <ListItemButton>Electronics</ListItemButton>
        </List>
      </NavLink>

      <NavLink to="/men" className="drawerCategories">
        <List>
          <ListItemButton>Men's Fashion</ListItemButton>
        </List>
      </NavLink>

      <NavLink to="/women" className="drawerCategories">
        <List>
          <ListItemButton>women's Fashion</ListItemButton>
        </List>
      </NavLink>

      <NavLink to="/homekitchen" className="drawerCategories">
        <List>
          <ListItemButton>Home, Kitchen</ListItemButton>
        </List>
      </NavLink>

      <Divider />

      <List>
        <div className="categoriesHeading">Help & Setting</div>
      </List>

      <NavLink to="" className="drawerCategories">
        <List>
          <ListItemButton>Your Order</ListItemButton>
        </List>
      </NavLink>

      <NavLink to="/feedback" className="drawerCategories">
        <List>
          <ListItemButton>Feedback</ListItemButton>
        </List>
      </NavLink>

      <List>
        <ListItemButton>
          {Token ? (
            <button className="drawerSignInSignOutBtn" onClick={logout}>
              Sign Out
            </button>
          ) : (
            <NavLink to="/signin">
              <button className="drawerSignInSignOutBtn">Sign in</button>
            </NavLink>
          )}
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <div>
        {["left"].map((anchor) => (
          <>
            <div onClick={toggleDrawer(anchor, true)} className="DrawerBtnDiv">
              <div className="menuIconDiv">
                <MenuIcon />
              </div>
              <div>All</div>
            </div>
            <Drawer open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </>
        ))}
      </div>
    </>
  );
};

export default DrawerComponent;
