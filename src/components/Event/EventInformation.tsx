import {Container, Card, CardBody} from 'reactstrap';

interface EventsInformationProps {

}

export default function EventsInformation(props: EventsInformationProps) {
    return (
        <Container className="text-center d-flex flex-column align-items-center justify-content-center">
            <Card className='w-auto m-3'>
                <CardBody className='text-start'>
                    <h5>TAPATHUMAN KUVAUS</h5>
                </CardBody>
            </Card>
        </Container>
    );
}