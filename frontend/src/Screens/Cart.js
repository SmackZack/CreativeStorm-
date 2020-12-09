import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../Component/Message'
import { addToCart,removeFormCart } from '../actions/cartActions'

function Cart({ match, location, history }) {
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log(cartItems);
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFormCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col md={8}><h1 className="py-3">Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your Cart is empty <Link to="/" className="font-weight-bold">Go Back</Link></Message> : (
                    <ListGroup variant="flush">{cartItems.map(item => (
                        <ListGroupItem key={item.product}>
                            <Row>
                                <Col sm={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col sm={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col sm={2}>${item.price}</Col>
                                <Col sm={3}>
                                    <Form.Control
                                        as="select"
                                        value={item.qty}
                                        onChange={(e) =>
                                            dispatch(
                                                addToCart(item.product, Number(e.target.value))
                                            )}>
                                        {[...Array(item.countInStock).keys()].map((x) => (<option key={x + 1} value={x + 1}>{x + 1}</option>))}
                                    </Form.Control>
                                </Col>
                                <Col sm={2}><Button variant="light" onClick={() => removeFromCartHandler(item.product)}>
                                    <i className="fas fa-trash"></i>
                                </Button></Col>
                            </Row>
                        </ListGroupItem>))}</ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card className="my-3">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h4>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroupItem>
                            <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Checkout</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default Cart
