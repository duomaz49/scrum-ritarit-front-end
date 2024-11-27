import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, Table } from 'reactstrap';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { IEvent } from '../../../types/event.ts';
import { ISale } from '../../../types/sale.ts';
import { IEventTicketType } from '../../../types/eventTicketType.ts';
import { formatDate } from "../../../utils/date.ts";

interface TicketCarouselProps {
    sale: ISale;
    event: IEvent;
}

export default function TicketCarousel({ sale, event }: TicketCarouselProps) {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const getTicketTypeName = (ticketTypeId: number): string => {
        const ticketType = event.eventTicketTypes.find(
            (type: IEventTicketType) => type.ticketTypeId === ticketTypeId
        );
        return (ticketType?.ticketTypeName) || "Ticket Type not found";
    };

    // Määrittele next "napin" indeksi, jos nolla looppaa

    const next = () => {
        if (animating) return;

        if (carouselIndex === sale.tickets.length - 1) {
            setCarouselIndex(0);
        } else {
            setCarouselIndex(carouselIndex + 1);
        }
    };

    // Määrittele previous "napin" indeksi, jos nolla looppaa

    const previous = () => {
        if (animating) return;

        if(carouselIndex === 0){
            setCarouselIndex((sale.tickets.length - 1));
        } else {
            setCarouselIndex(carouselIndex - 1);
        }
    };

    const goToIndex = (newIndex: number) => {
        if (animating) return;
        setCarouselIndex(newIndex);
    };

    // Luo ticket carousel itemiksi

    const slides = sale.tickets.map((ticket, index) => (
        <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={ticket.ticketNumber || index}
        >
            <div className="ticket-content text-center">
                <h6 className="fw-bold">{event.eventName} - {getTicketTypeName(ticket.ticketTypeId)}</h6>
                <div className="p-3">
                    <QRCodeSVG value={ticket.ticketNumber || "defaultValue"} size={150} level="L" />
                </div>
                <p className="italic">{formatDate(event.eventDate)} - {event.location}</p>
                <Table bordered responsive className="mt-3">
                    <thead>
                        <tr>
                            <th className="p-2 text-center align-middle">Ticket code</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 text-center align-middle">{ticket.ticketNumber}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </CarouselItem>
    ));

    return (
        <Carousel
            activeIndex={carouselIndex}
            next={next}
            previous={previous}
            interval={0}
            dark
        >
            <CarouselIndicators
                items={sale.tickets}
                activeIndex={carouselIndex}
                onClickHandler={goToIndex}
                style={{ display: 'none' }}
            />
            {slides}
            <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
            />
            <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
            />
        </Carousel>
    );
}
