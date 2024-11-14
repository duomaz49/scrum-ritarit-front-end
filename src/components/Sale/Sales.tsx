import {Container, Card, CardBody} from 'reactstrap';
import EventsCarousel from "../Event/EventsCarousel.tsx";

interface SalesProps {

}

export default function Sales(props: SalesProps) {
    // TODO: Katsotaan joko backissä tai frontissa, että onko sisäänkirjautunut käyttäjän id sama kuin tapahtumaan merkitty userId
    return (
        <Container className="d-flex justify-content-center">
            <Card className='w-auto m-3'>
                <CardBody className='text-start'>
                    <h2 className="text-center">LIPUNYYNTI</h2>
                    <EventsCarousel/>
                </CardBody>
            </Card>
        </Container>
    );
}