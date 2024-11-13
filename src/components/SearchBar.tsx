import { useState } from 'react';
import { Input } from 'reactstrap';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
    const [query, setQuery] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        props.onSearch(newQuery);
    };

    return <Input className="w-100" type="search" placeholder="Enter a ticket number..." onChange={handleChange} value={query} />;
}
