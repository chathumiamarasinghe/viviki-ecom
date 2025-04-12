import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaBoxes, FaTags, FaClipboardList, FaThList, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/adminPage.css";
import CategoryChart from './CategoryChart';


const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-4">
      <Row className="min-vh-100">
        
        <Col md={2} className="sidebar d-flex flex-column align-items-start p-3">
          <h4 className="text-white mb-4">Admin</h4>
          <Nav className="flex-column w-100">
            <Nav.Link onClick={() => navigate("/admin/categories")} className="nav-item">
              <FaTags className="me-2" /> Categories
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/admin/products")} className="nav-item">
              <FaBoxes className="me-2" /> Products
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/admin/orders")} className="nav-item">
              <FaClipboardList className="me-2" /> Orders
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/admin/materials")} className="nav-item">
              <FaThList className="me-2" /> Materials
            </Nav.Link>
            <Nav.Link onClick={() => navigate("#")} className="nav-item">
              <FaUser className="me-2" /> Users
            </Nav.Link>
          </Nav>
        </Col>

        
        <Col md={10} className="p-5">
          <h1>Welcome Admin</h1>
          <p>Select an option from the sidebar to manage your store.</p>

          
          <CategoryChart /> 
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
