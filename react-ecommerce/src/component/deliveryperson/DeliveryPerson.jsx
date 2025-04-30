import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaClipboardList } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/adminPage.css";


const DeliveryPersonPage = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-4">
      <Row className="min-vh-100">
        
        <Col md={2} className="sidebar d-flex flex-column align-items-start p-3">
          <h4 className="text-white mb-4">Delivery Person</h4>
          <Nav className="flex-column w-100">
            <Nav.Link onClick={() => navigate("/delivery/orders")} className="nav-item">
              <FaClipboardList className="me-2" /> Orders
            </Nav.Link>
          </Nav>
        </Col>

        
        <Col md={10} className="p-5">
          <h1>Welcome </h1>
          <p>Select an option from the sidebar to manage your orders.</p>

        
        </Col>
      </Row>
    </Container>
  );
};

export default DeliveryPersonPage;
