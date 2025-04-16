import React from 'react';
import '../../style/CategoryCard.css'; // custom styles
import { Button } from 'react-bootstrap';

const CategoryCard = ({ title, type, image, bgColor, textColor, btnColor, btnTextColor }) => {
  return (
    <div
      className="category-card d-flex flex-column justify-content-between rounded-4 p-5 mb-4"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="text-start d-flex align-items-baseline gap-1 mb-2">
  <span style={{ fontSize: '1rem' }}>Enjoy</span>
  <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>With</span>
</div>
<h2 className="fw-bolder">{type}</h2>

<div className="d-flex justify-content-between align-items-end mt-auto">
  <Button
    className="rounded-pill px-4 fw-semibold"
    style={{
      backgroundColor: btnColor,
      color: btnTextColor || '#000',
      border: 'none'
    }}
  >
    Browse
  </Button>
  <img src={image} alt={type} className="category-img" />
</div>

    </div>
  );
};


export default CategoryCard;
