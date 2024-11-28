import { useState } from 'react';
import { Input } from 'reactstrap';

interface SearchBarProps {
    query: string;
    setQuery: (query: string) => void
    width?: string;
    placeholder?: string;
}

export default function SearchBar(props: SearchBarProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        props.setQuery(newQuery);
    };

    return <Input
        className={props.width}
        type="search"
        placeholder={props.placeholder}
        onChange={handleChange}
        value={props.query} />;
}
