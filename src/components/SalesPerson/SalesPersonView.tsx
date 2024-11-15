import React from "react";
import {Button, Card, CardBody, Container} from "reactstrap";

// TODO: Add link to the button for routes

export default function SalesPersonView() {
    return (
        <Container className="d-flex justify-content-center">
            <Card className='w-50 m-3 p-4'>
                <CardBody className='text-start'>
                    <h1 className="text-center">SalesPerson View</h1>
                    <hr className="my-4"/>
                    <Button color="success" block className="mb-2">Sell Tickets</Button>
                    <Button color="success" block>Check Tickets</Button>
                </CardBody>
            </Card>
        </Container>
    );
}