import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Row className="text-center">
                <Col>
                    <h1 className="display-1 text-danger">404</h1>
                    <p className="lead">Sorry, the page you are looking for does not exist.</p>
                    <Button color="primary" onClick={() => navigate('/')}>
                        Back to login
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
