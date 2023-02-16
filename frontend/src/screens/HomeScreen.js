import React from "react";
import { Col, Row } from "react-bootstrap";
import products from "../products";
import Products from "../components/Products";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Link to={`/product/${product._id}`}>
              <Products product={product} />
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
