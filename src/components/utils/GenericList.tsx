import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface GenericListProps<T> {
    isAdmin?: boolean;
    items: T[];
    renderItem: (item: T) => string | React.ReactNode;
    onItemClick: (item: T, action: 'edit' | 'delete' | 'info' | 'click') => void;
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
            <ListGroup className={props.listAsRowClassName} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {props.items.map((item, index) => (
                    !props.isAdmin ? (
                        <Button
                            key={index}
                            color={props.buttonColor}
                            outline
                            className={props.buttonClassName}
                            disabled={props.disableCondition ? props.disableCondition(item) : false}
                            onClick={() => props.onItemClick(item, 'click')}
                        >
                            {props.renderItem(item)}
                        </Button>
                    ) : (
                        <ListGroupItem key={index}
                                       className={`${props.buttonClassName} d-flex justify-content-between align-items-center border p2 rounded border-dark `}
                        >
                            <div className="flex-grow-1">
                                {props.renderItem(item)}
                            </div>

                            <div>
                                <Button
                                    color="warning"
                                    className="m-1"
                                    outline
                                    onClick={() => props.onItemClick(item, 'edit')}
                                >
                                    <FontAwesomeIcon icon={faEdit}/> Edit
                                </Button>
                                <Button
                                    color="danger"
                                    className="m-1"
                                    outline
                                    onClick={() => props.onItemClick(item, 'delete')}
                                >
                                    <FontAwesomeIcon icon={faTrash}/> Delete
                                </Button>
                                <Button
                                    color="primary"
                                    className="m-1"
                                    outline
                                    onClick={() => props.onItemClick(item, 'info')}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle}/> Info
                                </Button>
                            </div>
                        </ListGroupItem>
                    )
                ))}
            </ListGroup>
        </div>
    );
}