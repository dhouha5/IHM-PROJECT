import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';

const HomeScreen = ({ match }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();

    // useSelector is to grab what we want from the state
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    // make request here upon component load
    useEffect(() => {
        // Fire off action to get the products
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]); // Dependencies, on change they fire off useEffect

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        // You can dispatch an action here to filter products based on category
    };

    return (
        <>
            <Meta />
            <div>
                <MenuAlignResponsiveExample
                    onSelectCategory={handleCategorySelect}
                    selectedCategory={selectedCategory}
                />
            </div>
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link className='btn btn-light' to='/'>
                    Go Back
                </Link>
            )}
            <h1>Latest Products</h1>
            {/* When loading, display Loading...
            On error, display error
            Else display the products */}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md='6' lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}
        </>
    );
};

const MenuAlignResponsiveExample = ({ onSelectCategory, selectedCategory }) => {
    const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];

    return (
        <>
            {categories.map((category, index) => (
                <SplitButton
                    key={index}
                    id={`dropdown-split-button-${index}`}
                    title={category}
                    align={{ lg: 'start' }}
                    onSelect={() => onSelectCategory(category)}
                    className='mt-2'
                >
                    <Dropdown.Item eventKey={`1-${index}`}>Action 1</Dropdown.Item>
                    <Dropdown.Item eventKey={`2-${index}`}>Action 2</Dropdown.Item>
                </SplitButton>
            ))}
        </>
    );
};

export default HomeScreen;
