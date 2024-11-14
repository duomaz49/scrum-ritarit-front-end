import { Button, ListGroup } from 'reactstrap';

interface GenericListProps<T> {
    items: T[];
    renderItem: (item: T) => string | React.ReactNode;
    onItemClick: (item: T) => void;
    buttonColor: string;
    title: string;
    disableCondition?: (item: T) => boolean;
    buttonClassName?: string;
    listAsRowClassName?: string;
}

export default function GenericList<T>(props: GenericListProps<T>) {
    return (
        <div className="w-100 card-no-border">
            <h6 className="text-center mt-4 mb-4">{props.title}</h6>
            <ListGroup
                className={props.listAsRowClassName}
            >
                {props.items.map((item, index) => (
                    <Button
                        key={index}
                        color={props.buttonColor}
                        outline
                        className={props.buttonClassName}
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