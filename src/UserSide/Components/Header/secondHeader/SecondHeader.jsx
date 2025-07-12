import React, { useEffect, useState } from "react";
import "./SecondHeader.css";
import { useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import SearchIcon from "@mui/icons-material/Search";
import DrawerComponent from "../drawer/DrawerComponent";
import BASE_URL from "../../../../services/Helper";

const SecondHeader = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await BASE_URL.get("/user/products/allProducts/get");
      setAllProducts(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="second-header">
      {/* Categories / Drawer */}
      <div className="second-header__category">
        <DrawerComponent />
      </div>

      <div
        onClick={() => navigate("/mobile")}
        className="second-header__category second-header__link"
      >
        Mobiles
      </div>

      <div
        onClick={() => navigate("/electronic")}
        className="second-header__category second-header__link"
      >
        Electronics
      </div>

      <div
        onClick={() => navigate("/men")}
        className="second-header__category second-header__link"
      >
        Men's Fashion
      </div>

      <div
        onClick={() => navigate("/women")}
        className="second-header__category second-header__link"
      >
        Women's Fashion
      </div>

      <div
        onClick={() => navigate("/homekitchen")}
        className="second-header__category second-header__link"
      >
        Home, Kitchen
      </div>

      {/* Search Field */}
      <div className="second-header__search">
        <input
          type="text"
          placeholder="Search Your Product"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="second-header__search-input"
        />

        <div className="second-header__search-icon">
          <SearchIcon />
        </div>

        {searchText && (
          <ul className="second-header__search-list">
            {allProducts
              .filter((product) =>
                product.shortTitle
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              )
              .map((product) => (
                <li
                  key={product._id}
                  className="second-header__search-item"
                  onClick={() => {
                    setSearchText("");
                    navigate(`/productDetail/${product._id}`);
                  }}
                >
                  <ListItem>{product.shortTitle}</ListItem>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SecondHeader;
