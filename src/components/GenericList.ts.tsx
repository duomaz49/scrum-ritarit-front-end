import { Button, ListGroup } from 'reactstrap';

interface GenericListProps<T> {
    items: T[];
    renderItem: (item: T) => string;
    onItemClick: (item: T) => void;
    buttonColor: string;
    title: string;
    disableCondition?: (item: T) => boolean;
}

export default function GenericList<T>(props: GenericListProps<T>) {
    return (
        <div className="w-100 card-no-border">
            <h3 className="mt-4 mb-4">{props.title}</h3>
            <ListGroup style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                {props.items.map((item, index) => (
                    <Button
                        key={index}
                        color={props.buttonColor}
                        outline
                        className="w-100 text-left mb-2"
                        disabled={props.disableCondition ? props.disableCondition(item) : false}
                        onClick={() => props.onItemClick(item)}
                    >
                        {props.renderItem(item)}
                    </Button>
                ))}
            </ListGroup>
        </div>
    );
}