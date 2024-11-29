import {useState} from "react";
import {Button, Card, CardBody, Container} from "reactstrap";
import AdminEventsList from "./Event/AdminEventsList.tsx";
import CreateOrEditEventForm from "./Event/CreateOrEditEventForm.tsx";
import OverlayComponent from "../utils/Overlay.tsx";

// TODO: Katsotaan joko backissä tai frontissa, että onko sisäänkirjautunut käyttäjän id
//  sama kuin tapahtumaan merkitty userId jotta saadaan näytettyä oikeat tapahtumat
//  Lisää create event nappiin reititys evetFormiin

export default function AdminView() {
    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState<boolean>(false);
    const [shouldReFetch, setShouldReFetch] = useState<boolean>(false);

    const toggleCreateEventModal = () => {
        setShouldReFetch(true);
        setIsCreateEventModalOpen(!isCreateEventModalOpen);
    }

    return (
        <Container className="d-flex justify-content-center mt-4">
            <Card className='w-50 m-3 p-4'>
                <CardBody className='text-start'>
                    <h1 className="text-center">Admin View</h1>
                    <hr className="my-4"/>
                    <Button color="success" block onClick={() => setIsCreateEventModalOpen(!isCreateEventModalOpen)}>
                        Create New Event
                    </Button>
                    <hr className="my-4"/>
                    <AdminEventsList shouldReFetch={shouldReFetch} setShouldReFetch={setShouldReFetch}/>
                </CardBody>
            </Card>
            <OverlayComponent
                isOpen={isCreateEventModalOpen}
                toggle={() => setIsCreateEventModalOpen(!isCreateEventModalOpen)}
                title='Create event'
            >
                <CreateOrEditEventForm toggleModal={toggleCreateEventModal}/>
            </OverlayComponent>
        </Container>
    );
}