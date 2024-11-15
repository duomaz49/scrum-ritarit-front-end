import React from "react";
import {Button, Card, CardBody, Container} from "reactstrap";
import AdminEventsList from "./Event/AdminEventsList.tsx";

// TODO: Katsotaan joko backissä tai frontissa, että onko sisäänkirjautunut käyttäjän id
//  sama kuin tapahtumaan merkitty userId jotta saadaan näytettyä oikeat tapahtumat
//  Lisää create event nappiin reititys evetFormiin

export default function AdminView() {
    return (
        <Container className="d-flex justify-content-center">
            <Card className='w-50 m-3 p-4'>
                <CardBody className='text-start'>
                    <h1 className="text-center">Admin View</h1>
                    <hr className="my-4"/>
                    <Button color="success" block>
                        Create New Event
                    </Button>
                    <hr className="my-4"/>
                    <AdminEventsList/>
                </CardBody>
            </Card>
        </Container>
    );
}