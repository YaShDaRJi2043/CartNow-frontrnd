import React, { useContext, useEffect } from "react";
import "./FirstHeader.css";
import { NavLink, useNavigate } from "react-router-dom";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BASE_URL from "../../../../services/Helper";
import { useState } from "react";
import { LoginDataContext } from "../../context/ContextProvider";

const FirstHeader = () => {
  const { loginDataCalled, setLoginDataCalled } = useContext(LoginDataContext);
  console.log(loginDataCalled);

  const PageNavigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const Token = localStorage.getItem("usertoken");

  const AddressNavigate = () => {
    Token ? PageNavigate("/address") : PageNavigate("/signin");
  };

  const CartNavigate = () => {
    Token ? PageNavigate("/cart") : PageNavigate("/signin");
  };

  const getUserDetail = async () => {
    try {
      const getUserData = await BASE_URL.get("/getCurrentLoginUserDetail", {
        headers: {
          Authorization: Token,
        },
      });
      setUserData(getUserData?.data);
      setLoginDataCalled(false);
    } catch {
      setUserData(null);
    }
  };

  const getAddressDetail = async () => {
    const USER_ID = localStorage.getItem("userId");
    const getAddress = await BASE_URL.get(`/displayUserAddress?id=${USER_ID}`);
    setUserAddress(getAddress?.data?.displayUserAddress[0]);
  };

  useEffect(() => {
    if (loginDataCalled === true) {
      getUserDetail();
      getAddressDetail();
    }
  });

  return (
    <>
      <div className="firstNavDiv">
        {/* ICON */}
        <NavLink to="/" id="borderForFirstHeaderCompo">
          <img src="/main_logo.png" alt="Logo" className="MainLogo" />
        </NavLink>

        {/* address */}
        <div
          className="AddressDiv"
          id="borderForFirstHeaderCompo"
          onClick={AddressNavigate}
        >
          <div className="AddressLogo">
            <RoomOutlinedIcon />
          </div>
          <div>
            <div>
              {userData
                ? "Deliver to " +
                  userData.name[0]?.toUpperCase() +
                  userData.name.substring(1)
                : "Hello"}
            </div>
            <div>
              {userAddress
                ? userAddress?.city + " " + userAddress?.pin
                : "Add Your Address"}
            </div>
          </div>
        </div>

        {/* signin */}
        <div
          onClick={() => (userData ? null : PageNavigate("/signin"))}
          id="borderForFirstHeaderCompo"
          className="signInDiv"
        >
          {userData ? (
            <>
              <div>
                Hello,{" "}
                {userData?.name[0].toUpperCase() + userData?.name.substring(1)}
              </div>
            </>
          ) : (
            <>
              <div>Hello, Sign in</div>
            </>
          )}
        </div>

        {/* cart */}
        <div
          onClick={CartNavigate}
          id="borderForFirstHeaderCompo"
          className="cartDiv"
        >
          <span>
            <Badge badgeContent={userData?.carts?.length} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </span>
          <span className="CartTxt">Cart</span>
        </div>
      </div>
    </>
  );
};

export default FirstHeader;
