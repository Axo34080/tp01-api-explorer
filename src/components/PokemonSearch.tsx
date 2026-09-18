import { useState } from "react";
import type { SubmitEvent } from 'react';

interface PokemonSearchProps {
    onSearch: (query: string) => void;
    isLoading: boolean;
}

export default function PokemonSearch({ onSearch, isLoading }: PokemonSearchProps) {
    const [query, setQuery] = useState('');

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const value = query.trim();
        if (value) onSearch(value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="pokemon-search">Rechercher un Pokémon :</label>
            <input
                id="pokemon-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nom ou ID du Pokémon"
                required
            />
            <button type="submit" disabled={!query.trim()}>
                {isLoading ? 'Recherche en cours...' : 'Rechercher'}
            </button>
        </form>
    )
}
