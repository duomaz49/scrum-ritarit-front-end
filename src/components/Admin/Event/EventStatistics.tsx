import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

export default function EventStatistics() {
    return (
        <Container className="d-flex align-items-center justify-content-center">
            <Card className="w-100 card-no-border p-2">
                <CardBody className="text-center d-flex flex-column align-items-center justify-content-center">
                    <Row className="w-100">
                        <Col xs="12" sm="6" md="6" lg="6" xl="6" className="mb-4 d-flex justify-content-center">
                            <Card className="w-100 card-no-border p-2">
                                <CardBody className="text-center d-flex flex-column align-items-center justify-content-center">
                                    <p>LOL</p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="12" sm="6" md="6" lg="6" xl="6" className="mb-4 d-flex justify-content-center">
                            <Card className="w-100 card-no-border p-2">
                                <CardBody className="text-center d-flex flex-column align-items-center justify-content-center">
                                    <p>LOL</p>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    );
}