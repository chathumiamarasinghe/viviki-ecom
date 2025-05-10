import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/adminPage.css";
import CategoryChart from './CategoryChart';


const AdminPage = () => {

  return (
    <Container fluid className="p-4">
      <Row className="min-vh-100">
        
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
