import type { Pokemon, PokemonPreview } from '@/types/pokemon';
import PokemonType from '@/components/PokemonType';

interface PokemonDetailProps {
    mode: 'detail'
    pokemon: Pokemon;
}

interface PokemonPreviewProps {
    mode: 'preview'
    pokemon: PokemonPreview;
    onSelect: (name: string) => void;
}

type PokemonCardProps = PokemonDetailProps | PokemonPreviewProps;

export default function PokemonCard(props: PokemonCardProps) {
    if (props.mode === 'preview') {
        return (
            <article>
                <button type="button" onClick={() => props.onSelect(props.pokemon.name)}>
                    {props.pokemon.name}
                </button>
            </article>
        )
    }

    const { pokemon } = props;
    const image = pokemon.sprites.front_default

    return (
        <article>
            <h2>#{pokemon.id} {pokemon.name}</h2>
            {image ? (
            <img src={image} alt={pokemon.name} width={96} height={96} />
            ) : (
              <p> Image indisponible.</p>
            )}
            <PokemonType types={pokemon.types} />
        </article>      
    )
}
