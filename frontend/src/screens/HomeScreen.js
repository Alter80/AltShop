import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Products from "../components/Products";
import { Link } from "react-router-dom";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };

    fetchProducts();
  }, []);

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
