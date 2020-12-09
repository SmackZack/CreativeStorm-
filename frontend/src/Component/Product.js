import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Rating from "./Rating";
import { useDispatch } from 'react-redux'
import { addToWishList } from '../actions/wishlistActions'

const Product = ({ product }) => {
  const dispatch = useDispatch()
  const addtoWishlistHandler = (id) => {
    dispatch(addToWishList(id))
  }
  return (
    <Card className="mb-5 shadow">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          variant="top"
          src={product.image}
          fluid
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title className="text-primary font-weight-bold mb-auto mt-2">
            {product.name}
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={product.rating} numReviews={product.numReviews} />
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Text as="h2">${product.price}</Card.Text>
          <Card.Text><Button className="btn-light border rounded-circle py-2 px-3" onClick={() => addtoWishlistHandler(product._id)}><i className="fas fa-heart"></i></Button></Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
