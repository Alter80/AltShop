import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

const Product = () => {
  const { productId } = useParams();

  const [singleProduct, setSingleProduct] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);

      setSingleProduct(data);
    };

    fetchProducts();
  }, [productId]);

  return (
    <>
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>
      <Row className="mx-auto">
        <Col md={6}>
          <Image
            src={singleProduct.image}
            alt={singleProduct.name}
            fluid
          ></Image>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{singleProduct.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={singleProduct.rating}
                text={`${singleProduct.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${singleProduct.price}</ListGroup.Item>
            <ListGroup.Item>{singleProduct.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${singleProduct.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {singleProduct.countInStock > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid">
                  <Button
                    type="button"
                    variant="outline-dark"
                    disabled={singleProduct.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Product;
