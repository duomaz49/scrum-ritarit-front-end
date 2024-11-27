import {Container, Card, CardBody, Button} from 'reactstrap';
import SalesPersonEventList from "./Event/SalesPersonEventList.tsx";
import OverlayComponent from "../../utils/Overlay.tsx";
import EventsInformation from "./Event/EventInformation.tsx";
import React, {useEffect, useState} from "react";
import {IEvent} from "../../../types/event.ts";
import {getEvents, sellTicket} from "../../../utils/api.ts";
import ProofOfSale from "./ProofOfSale.tsx";
import {ISale} from "../../../types/sale.ts";
import {useNavigate} from "react-router-dom";

// TODO: Katsotaan joko backissä tai frontissa, että onko sisäänkirjautunut käyttäjän id
//  sama kuin tapahtumaan merkitty userId Myös saleen tartee userId:tä


export default function TicketSale() {
    const navigate = useNavigate();
    const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
    const [isProofOfSaleModalOpen, setIsProofOfSaleModalOpen] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<IEvent>(null);
    const [succesfulSale, setSuccesfulSale] = useState<ISale>(null);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [shouldReFetch, setShouldReFetch] = useState<boolean>(false);

    useEffect(() => {
        getEvents(setEvents);
    }, []);

    useEffect(() => {
        setShouldReFetch(false)
        getEvents(setEvents);
    }, [shouldReFetch]);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsEventModalOpen(true);
    };

    const handleTicketSale = (saleData) => {
        setIsEventModalOpen(false);
        sellTicket(saleData, setSuccesfulSale, setIsProofOfSaleModalOpen);
        setShouldReFetch(true);
    }

    return (
        <Container className="d-flex justify-content-center">
            {events && events.length > 0 && <Card className='w-50 m-3 p-4'>
                <CardBody className='text-start'>
                    <h2 className="text-center">Sell Tickets here!</h2>
                    <SalesPersonEventList events={events} handleEventClick={handleEventClick}/>
                    <hr className="my-4"/>
                    <Button color="warning" block className="mb-2" onClick={() => navigate('/user')}>Go back</Button>
                </CardBody>
            </Card>}
            <OverlayComponent
                isOpen={isEventModalOpen}
                toggle={() => setIsEventModalOpen(!isEventModalOpen)}
                title="Event information"
            >
                <EventsInformation event={selectedEvent} onBuyTicket={handleTicketSale}/>
            </OverlayComponent>
            <OverlayComponent
                isOpen={isProofOfSaleModalOpen}
                toggle={() => setIsProofOfSaleModalOpen(!isProofOfSaleModalOpen)}
                title="Proof of sale"
            >
                <ProofOfSale sale={succesfulSale} event={selectedEvent}
                             toggleModal={() => setIsProofOfSaleModalOpen(!isProofOfSaleModalOpen)}/>
            </OverlayComponent>
        </Container>
    );
}