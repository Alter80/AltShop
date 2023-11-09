import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [qty, setQty] = useState(0);
  const { productId } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch]);

  const singleProduct = product;

  const addToCartHandeler = () => {
    history(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <>
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message veriant="danger">{error}</Message>
      ) : (
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

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Select
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          className="px-4 py-1"
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (count) => (
                              <option key={count + 1} value={count + 1}>
                                {count + 1}
                              </option>
                            )
                          )}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="outline-dark"
                      disabled={singleProduct.countInStock === 0}
                      onClick={addToCartHandeler}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
