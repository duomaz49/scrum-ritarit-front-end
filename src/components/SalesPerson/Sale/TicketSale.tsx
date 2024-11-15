import {Container, Card, CardBody} from 'reactstrap';
import Events from "./Event/Events.tsx";
import OverlayComponent from "../../utils/Overlay.tsx";
import EventsInformation from "./Event/EventInformation.tsx";
import {useState} from "react";
import {IEvent} from "../../../types/event.ts";
import {sellTicket} from "../../../utils/api.ts";
import ProofOfSale from "./ProofOfSale.tsx";
import {ISale} from "../../../types/sale.ts";

// TODO: Katsotaan joko backissä tai frontissa, että onko sisäänkirjautunut käyttäjän id
//  sama kuin tapahtumaan merkitty userId Myös saleen tartee userId:tä


export default function TicketSale() {
    const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
    const [isProofOfSaleModalOpen, setIsProofOfSaleModalOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<IEvent>(null);
    const [succesfulSale, setSuccesfulSale] = useState<ISale>(null);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsEventModalOpen(true);
    };

    const handleTicketSale = (saleData) => {
        setIsEventModalOpen(false);
        sellTicket(saleData, setSuccesfulSale, setIsProofOfSaleModalOpen)
    }

    return (
        <Container className="d-flex justify-content-center">
            <Card className='w-50 m-3 p-4'>
                <CardBody className='text-start'>
                    <h2 className="text-center">LIPUNMYYNTI</h2>
                    <Events handleEventClick={handleEventClick}/>
                </CardBody>
            </Card>
            <OverlayComponent
                isOpen={isEventModalOpen}
                toggle={() => setIsEventModalOpen(!isEventModalOpen)}
            >
                <EventsInformation event={selectedEvent} onBuyTicket={handleTicketSale} />
            </OverlayComponent>
            <OverlayComponent
                isOpen={isProofOfSaleModalOpen}
                toggle={() => setIsProofOfSaleModalOpen(!isProofOfSaleModalOpen)}
            >
                <ProofOfSale sale={succesfulSale} toggleModal={() => setIsProofOfSaleModalOpen(!isProofOfSaleModalOpen)} />
            </OverlayComponent>
        </Container>
    );
}