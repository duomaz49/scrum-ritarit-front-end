import {Container, Card, CardBody} from 'reactstrap';

interface SalesProps {

}

export default function Sales(props: SalesProps) {
    return (
        <Container className="text-center d-flex flex-column align-items-center justify-content-center">
            <Card className='w-auto m-3'>
                <CardBody className='text-start'>
                    <h5>LIPUNYYNTI</h5>
                </CardBody>
            </Card>
        </Container>
    );
}