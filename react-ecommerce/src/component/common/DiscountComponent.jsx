import React, { useState, useEffect } from 'react';
import ApiService from "../../service/ApiService";

const DiscountComponent = ({ productId }) => {
  const [discount, setDiscount] = useState(null);

  useEffect(() => {
    ApiService.getDiscountByProductId(productId)
      .then((response) => {
        setDiscount(response);
      })
      .catch((error) => {
        console.error("Error fetching discount", error);
      });
  }, [productId]);

  return (
    <div>
      <h2>Discount</h2>
      {discount ? (
        <div>
          <p>Discount: {discount.discountPercent}%</p>
          <p>Valid until: {discount.validUntil}</p>
        </div>
      ) : (
        <p>No discount available for this product</p>
      )}
    </div>
  );
};

export default DiscountComponent;
