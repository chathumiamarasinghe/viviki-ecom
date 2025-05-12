import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/adminPage.css";
import CategoryChart from "./CategoryChart";
import ApiService from "../../service/ApiService";

const AdminPage = () => {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
  const fetchCounts = async () => {
    try {
      const productRes = await ApiService.getTotalProductCount();
      const orderRes = await ApiService.getTotalOrderCount();
      const userRes = await ApiService.getTotalUserCount();

      setProductCount(productRes.totalElement || 0);
      setOrderCount(orderRes.totalElement || 0);
      setUserCount(userRes.totalElement || 0);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  fetchCounts();
}, []);



  return (
    <Container fluid className="pt-1 px-3">
      <Row className="min-vh-100">
        <Col md={10} className="pt-1 px-3">
          <h1>Welcome Admin</h1>
          <p>Select an option from the sidebar to manage your store.</p>

          {/* Cards Section */}
          <Row className="mb-4">
  <Col md={4}>
  <Card className="text-white border-0 card-3d" style={{ background: "linear-gradient(135deg, #1e3c72,rgb(129, 157, 205))" }}>
    <Card.Body>
      <Card.Title className="fs-4 fw-bold">📦 Total Products</Card.Title>
      <Card.Text className="display-6">{productCount}</Card.Text>
    </Card.Body>
  </Card>
</Col>

<Col md={4}>
  <Card className="text-white border-0 card-3d" style={{ background: "linear-gradient(135deg, #ff6e7f, #bfe9ff)" }}>
    <Card.Body>
      <Card.Title className="fs-4 fw-bold">🧾 Total Orders</Card.Title>
      <Card.Text className="display-6">{orderCount}</Card.Text>
    </Card.Body>
  </Card>
</Col>

<Col md={4}>
  <Card className="text-white border-0 card-3d" style={{ background: "linear-gradient(135deg, #654ea3, #eaafc8)" }}>
    <Card.Body>
      <Card.Title className="fs-4 fw-bold">👤 Total Users</Card.Title>
      <Card.Text className="display-6">{userCount}</Card.Text>
    </Card.Body>
  </Card>
</Col>

</Row>


          {/* Chart Section */}
          <CategoryChart />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
