import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Row className="text-center">
                <Col>
                    <h1 className="display-1 text-danger">401</h1>
                    <p className="lead">This account doesn't have the necessary permissions</p>
                    <p><em>Please proceed to login which the right credentials</em></p>
                    <Button color="primary" onClick={() => navigate('/')}>
                        Login
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}