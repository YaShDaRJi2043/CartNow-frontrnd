import React, { useEffect, useState } from "react";

const Total = ({ item }) => {
  const [price, setPrice] = useState(0);

  const totalAmount = () => {
    let price = 0;
    item.map((e) => {
      return <>{(price += e.mrp)}</>;
    });
    setPrice(price);
  };

  useEffect(() => {
    totalAmount();
  }, [item]);

  return (
    <div>
      Total ({item.length} items):
      <strong style={{ fontWeight: "700", color: "#111" }}> ₹{price}.00</strong>
    </div>
  );
};
export default Total;
