import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Products from "../components/Products";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link, useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const productsPageNumber = pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, productsPageNumber));
  }, [dispatch, keyword, productsPageNumber]);

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader>Loading....</Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Link to={`/product/${product._id}`}>
                  <Products product={product} />
                </Link>
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
