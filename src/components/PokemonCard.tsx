import type { Pokemon } from '@/types/pokemon';
import PokemonType from '@/components/PokemonType';

interface PokemonCardProps {
    pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    const image = pokemon.sprites.front_default

    return (
        <article>
            <h2>#{pokemon.id} {pokemon.name}</h2>
            {image ? (
                <img src={image} alt={pokemon.name} width={96} height={96} />
            ) : (
                <p>Aucune image disponible</p>
            )}
            <PokemonType types={pokemon.types} />
        </article>
    )
}
