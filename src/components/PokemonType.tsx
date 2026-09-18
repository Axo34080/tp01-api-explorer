import type { Pokemon } from '@/types/pokemon';

interface PokemonTypeProps {
    types: Pokemon['types'];
}

export default function PokemonType({ types }: PokemonTypeProps) {
    return (
        <ul aria-label="Types du pokémon">
            {types.map(({ type }) => (
                <li key={type.name}>{type.name}</li>
            ))}
        </ul>
    )
}