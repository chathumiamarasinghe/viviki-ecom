import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import { Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ApiService from '../../service/ApiService';
import { categoryStyles, defaultStyle } from './CategoryStyleMap';
import { useNavigate } from 'react-router-dom';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
    setTimeout(() => AOS.refresh(), 100);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategory();
      setCategories(response.categoryList || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <Container className="my-5 px-xxl-5">
  <Row className="gx-4 gy-4">
    {categories.map((cat, index) => {
      const style = categoryStyles[cat.name] || defaultStyle;

      
      let colSize = "3"; 
      if (index === 2 || index === 3) colSize = "6"; 

      
      const animation = index <= 2 ? "fade-up" : "zoom-in";

      return (
        <Col
          key={cat.id}
          md={colSize}
          className="category-col"
          data-aos={animation}
          data-aos-delay={index * 100}
          onClick={() => handleCategoryClick(cat.id)}
          style={{ cursor: 'pointer' }}
        >
          <CategoryCard
            title={cat.name}
            type={cat.name}
            image={style.image}
            bgColor={style.bgColor}
            textColor={style.textColor}
            btnColor={style.btnColor}
            btnTextColor={style.btnTextColor}
          />
        </Col>
      );
    })}
  </Row>
</Container>

  );
};

export default CategorySection;
