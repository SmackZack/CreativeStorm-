import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Product from '../Component/Product'
import Message from '../Component/Message'
import Loader from '../Component/Loader'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])
    return (
        <div>
            <h2 className="mt-3">Latest Products</h2>
            {loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message>: <Row>
                {products.map(products => <Col key={products._id} className="d-flex justify-content-center" sm={12} md={6} lg={3}>
                    <Product product={products} />
                </Col>)}
            </Row>}
          
        </div>
    );

}

export default HomeScreen;
