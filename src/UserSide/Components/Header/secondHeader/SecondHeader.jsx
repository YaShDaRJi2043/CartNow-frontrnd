import React, { useEffect, useState } from "react";
import "./SecondHeader.css";
import { useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import SearchIcon from "@mui/icons-material/Search";
import DrawerComponent from "../drawer/DrawerComponent";
import BASE_URL from "../../../../services/Helper";

const SecondHeader = () => {
  const PageNavigate = useNavigate();

  const [allProductData, setAllProductData] = useState("");
  const [text, setText] = useState("");
  const [liopen] = useState("");

  const product = async () => {
    const getAllProduct = await BASE_URL.get("/allProducts");
    setAllProductData((await getAllProduct)?.data);
  };

  useEffect(() => {
    product();
  }, []);

  return (
    <>
      <div className="secondNavDiv">
        <div className="Categories">
          <DrawerComponent />
        </div>

        <div
          onClick={() => PageNavigate("/mobile")}
          className="Categories responsiveRev"
        >
          Mobiles
        </div>

        <div
          onClick={() => PageNavigate("/electronic")}
          className="Categories responsiveRev"
        >
          Electronics
        </div>

        <div
          onClick={() => PageNavigate("/men")}
          className="Categories responsiveRev"
        >
          Men's Fashion
        </div>

        <div
          onClick={() => PageNavigate("/women")}
          className="Categories responsiveRev"
        >
          Women's Fashion
        </div>

        <div
          onClick={() => PageNavigate("/homekitchen")}
          className="Categories responsiveRev"
        >
          Home, Kitchen
        </div>

        {/* search field */}
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="Search Your Product"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="search_input"
          />

          <div className="searchicon">
            <SearchIcon />
          </div>

          {text && (
            <list className="searchLists" hidden={liopen}>
              {allProductData
                .filter((product) =>
                  product.shortTitle.toLowerCase().includes(text.toLowerCase())
                )
                .map((product) => (
                  <div
                    onClick={() => {
                      setText("");
                      PageNavigate(`/productDetail/${product._id}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <ListItem className="searchListIteam">
                      {product.shortTitle}
                    </ListItem>
                  </div>
                ))}
            </list>
          )}
        </div>
      </div>
    </>
  );
};

export default SecondHeader;
