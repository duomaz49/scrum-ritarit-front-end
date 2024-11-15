import React from "react";
import { Card, CardBody, Container} from "reactstrap";
import Events from "./Event/Events.tsx";

// TODO: Katsotaan joko backissä tai frontissa, että onko sisäänkirjautunut käyttäjän id
//  sama kuin tapahtumaan merkitty userId jotta saadaan näytettyä oikeat tapahtumat


export default function AdminView() {
    return (
        <Container className="d-flex justify-content-center">
            <Card className='w-50 m-3 p-4'>
                <CardBody className='text-start'>
                    <h1 className="text-center">Admin View</h1>
                    <hr className="my-4"/>
                    <Events/>
                </CardBody>
            </Card>
        </Container>
    );
}