import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button } from 'react-bootstrap'
import Message from '../Component/Message'
import { Link } from 'react-router-dom'
import { removeFormWishList } from '../actions/wishlistActions'
//import { addToCart } from '../actions/cartActions'
import Rating from '../Component/Rating'

function Whislist({ history }) {
    const dispatch = useDispatch()
    const wishlist = useSelector(state => state.wishlist)
    const { wishlistItems } = wishlist
    console.log(wishlistItems)
    const removeFromWishlistHandler = (id) => {
        dispatch(removeFormWishList(id))
    }
    const addToCartHandler = (id) => {
        history.push(`/cart/${id}`)
    }
    return (
        <>
            <h2 className="mt-4 mb=0">Your Wishlist</h2>
            <Row>
                {wishlistItems.length === 0 ? <Message>Your Wishlist is Empty <Link to="/">Go Back</Link></Message> : wishlistItems.map(item =>
                    <Col lg={3} md={6} sm={12} className="mb-5" key={item.product}>
                        <Card className="shadow">
                            <Link to={`/product/${item.product}`}><Card.Img variant="top" src={item.image} /></Link>
                            <Card.Body>
                                <Link to={`/product/${item.product}`}><Card.Title>{item.name}</Card.Title></Link>
                                <Rating value={item.rating} numReviews={item.numReviews} />
                                <h2>${item.price}</h2>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-around">
                                <Button variant="success" className="btn-sm" onClick={() => addToCartHandler(item.product)}>Add to Cart</Button>
                                <Button variant="danger" className="btn-sm" onClick={() => removeFromWishlistHandler(item.product)}>Delete</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                )}
            </Row>
        </>
    )
}

export default Whislist
