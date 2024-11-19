import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import {IEvent} from "../../../types/event.ts";

interface EventStatisticsProps {
    event: IEvent;
}

// TODO: Endpoint jolla hakea kaikki eventiin liitetyt ostotapahumat, monta myyty, saatavilla, totaali summa myytyjen lippujen hinnasta
// TODO: Lisäksi kaikki lipputyypit ja niiden myydyt määrät
export default function EventStatistics(props: EventStatisticsProps) {
    return (
        <Container className="d-flex align-items-center justify-content-center">
            <Card className="w-100 card-no-border p-2">
                <CardBody className="text-center d-flex flex-column align-items-center justify-content-center">
                    <h4 className="text-center mb-3">Event statistics</h4>

                    <Row className="w-100">
                        <Col xs="12" sm="6" md="6" lg="6" xl="6" className="mb-4 d-flex justify-content-center">
                            <Card className="w-100 card-no-border p-2">
                                <CardBody
                                    className="text-center d-flex flex-column align-items-center justify-content-center">
                                    <div>LOL</div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="12" sm="6" md="6" lg="6" xl="6" className="mb-4 d-flex justify-content-center">
                            <Card className="w-100 card-no-border p-2">
                                <CardBody
                                    className="text-center d-flex flex-column align-items-center justify-content-center">
                                    <div>LOL</div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    );
}