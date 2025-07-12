import React from "react";
import ProductList from "../../Components/prodctList/ProductList";

const HomeKitchen = () => {
  return (
    <>
      <ProductList path="/user/products/homeKitchenProduct/get" />
    </>
  );
};

export default HomeKitchen;
