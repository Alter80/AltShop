import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Products = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img src={product.image} variant="top" />

      <Card.Body>
        <Card.Title>
          <strong>{product.name}</strong>
        </Card.Title>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color={"red"}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Products;
