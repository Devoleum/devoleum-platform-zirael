import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
const imgStyle = { width: "200px", height: "200px", objectFit: "cover" };
const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/history/${product._id}`}>
        <Card.Img style={imgStyle} src={product.data.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/history/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">{product.data.date}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
