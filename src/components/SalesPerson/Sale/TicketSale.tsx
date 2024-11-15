import {Container, Card, CardBody} from 'reactstrap';
import Events from "./Event/Events.tsx";
import OverlayComponent from "../../utils/Overlay.tsx";
import EventsInformation from "./Event/EventInformation.tsx";
import {useState} from "react";
import {IEvent} from "../../../types/event.ts";
import {sellTicket} from "../../../utils/api.ts";

// TODO: Katsotaan joko backissä tai frontissa, että onko sisäänkirjautunut käyttäjän id
//  sama kuin tapahtumaan merkitty userId Myös saleen tartee userId:tä


export default function TicketSale() {
    const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<IEvent>(null);
    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsEventModalOpen(true);
    };

    const handleTicketSale = (saleData) => {
        sellTicket(saleData, setIsEventModalOpen)
    }

    return (
        <Container className="d-flex justify-content-center">
            <Card className='w-auto m-3 p-4'>
                <CardBody className='text-start'>
                    <h2 className="text-center">LIPUNMYYNTI</h2>
                    <Events handleEventClick={handleEventClick}/>
                </CardBody>
            </Card>
            <OverlayComponent
                isOpen={isEventModalOpen}
                toggle={() => setIsEventModalOpen(!isEventModalOpen)}
            >
                {selectedEvent && <EventsInformation event={selectedEvent} onBuyTicket={handleTicketSale} />}
            </OverlayComponent>
        </Container>
    );
}