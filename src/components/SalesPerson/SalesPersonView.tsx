import React from "react";
import {Button, Card, CardBody, Container} from "reactstrap";
import {useNavigate} from "react-router-dom";
import { logoutTicketguru } from "../../utils/utils";

export default function SalesPersonView() {
    const navigate = useNavigate();
    return (
        <Container className="d-flex justify-content-center">
            <Card className='w-50 m-3 p-4'>
                <CardBody className='text-start'>
                    <h1 className="text-center">SalesPerson View</h1>
                    <hr className="my-4"/>
                    <Button color="success" block className="mb-2" onClick={() => navigate('/sales')}>Sell Tickets</Button>
                    <Button color="success" block className="mb-2" onClick={() => navigate('/check')}>Check Tickets</Button>
                    <Button color="danger" block className="mb-2" onClick={() => logoutTicketguru(navigate)}>Log Out</Button>
                </CardBody>
            </Card>
        </Container>
    );
}