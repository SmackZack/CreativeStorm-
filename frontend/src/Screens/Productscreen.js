import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, ListGroupItem, Card, Button, Form } from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'
import Rating from '../Component/Rating'
import Loader from '../Component/Loader'
import Message from '../Component/Message'

const Productscreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    return <div>
        <Link className="btn btn-light shadow-sm my-3" to="/"><i className="fas fa-arrow-left"></i> Go Back</Link>
        {loading ? <Loader></Loader> : error ? <Message variant="danger">{error}</Message> : <Row>
            <Col md={4} sm={12}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={5} sm={12}>
                <ListGroup variant="flush">
                    <ListGroupItem><h3>{product.name}</h3></ListGroupItem>
                    <ListGroupItem> <Rating value={product.rating} numReviews={product.numReviews} /></ListGroupItem>
                    <ListGroupItem><strong>Price:-</strong> ${product.price}</ListGroupItem>
                    <ListGroupItem>Description:-{product.description}</ListGroupItem>
                </ListGroup>

            </Col>
            <Col md={3} sm={12}>
                <Card className="border shadow rounded">
                    <ListGroup>
                        <ListGroupItem>
                            <Row>
                                <Col>Price:-</Col>
                                <Col>${product.price}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Status</Col>
                                <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                            </Row>
                        </ListGroupItem>
                        {product.countInStock > 0 && (
                            <ListGroupItem>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map((x) => (<option key={x + 1} value={x + 1}>{x + 1}</option>))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        )}
                        <ListGroupItem><Button onClick={addToCartHandler} className="btn btn-block btn-success" type="button" disabled={product.countInStock === 0}><i className="fas fa-shopping-cart"></i> Add to Cart</Button></ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>}
    </div>
}

export default Productscreen
