import React from "react";
import {Card, CardBody, Container} from "reactstrap";
import {IEvent} from "../../../types/event.ts";

interface EventSalesProps {
    event: IEvent;
}

// TODO: Kaikki eventiin liittyvät myyntitapahtumat, (Pvm, hinta, ostopahtuma. Lista kaikista myydyistä lipuista)
export default function EventSales(props: EventSalesProps) {
    return (
        <Container className="d-flex align-items-center justify-content-center">
            <Card className="w-100 card-no-border p-2">
                <CardBody
                    className="text-center d-flex flex-column align-items-center justify-content-center">
                    <div>LOL</div>
                </CardBody>
            </Card>
        </Container>
    );
}