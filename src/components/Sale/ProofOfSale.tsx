import {Container, Card, CardBody} from 'reactstrap';

export default function ProofOfSale() {
    return (
        <Container className="text-center d-flex flex-column align-items-center justify-content-center">
            <Card className='w-auto m-3'>
                <CardBody className='text-start'>
                    <h5>OSTOTAPAHUTMA</h5>
                </CardBody>
            </Card>
        </Container>
    );
}