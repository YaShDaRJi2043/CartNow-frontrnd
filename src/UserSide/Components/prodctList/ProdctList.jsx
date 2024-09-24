import React, { useEffect, useState } from "react";
import "./ProdctList.css";
import { NavLink } from "react-router-dom";
import BASE_URL from "../../../services/Helper";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ProdctList = ({ path }) => {
  const [productListData, setProductListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const getProductData = async () => {
    const productData = await BASE_URL.get(`${path}`);
    setProductListData(productData?.data);
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productListData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <div className="productListMainDiv">
        {currentProducts.map((e) => {
          return (
            <NavLink
              to={`/productDetail/${e._id}`}
              style={{ textDecoration: "none", color: "black" }}
              key={e._id}
            >
              <div className="productListDiv">
                <div className="productListImgDiv">
                  <img src={e.url} alt="product" className="productListImg" />
                </div>

                <div className="productListDetailDiv">
                  <div className="productListLongTitle">{e.longTitle}</div>

                  <div className="productListPriceDiv">
                    <span className="rupeeSymbol">₹</span>
                    <span className="productListCost">{e.cost}</span>

                    <del className="productListMrp">
                      <span>₹{e.mrp}</span>
                    </del>

                    <span>({e.discount} off)</span>
                  </div>

                  <div>
                    <div className="productListGetSoon">Get it soon</div>
                    <div className="productListFreeDelivery">
                      <span className="productListFreeTxt">FREE</span> Delivery
                      by CartNow
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>

      <div className="productListPaginationStack">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(productListData.length / productsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "instant" })
            }
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      </div>
    </>
  );
};

export default ProdctList;
