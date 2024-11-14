import {Container, Card, CardBody} from 'reactstrap';

interface EventsCarouselProps {

}

export default function EventsCarousel(props: EventsCarouselProps) {
    return (
        <Container className="text-center d-flex flex-column align-items-center justify-content-center">
            <Card className='w-auto m-3'>
                <CardBody className='text-start'>
                    <h5>TAPATHUMAT josta valita</h5>
                </CardBody>
            </Card>
        </Container>
    );
}