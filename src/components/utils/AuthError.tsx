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
                    <Button color="primary" onClick={() => navigate('/user')}>
                        Back to user view
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}