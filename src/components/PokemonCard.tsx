import type { Pokemon, PokemonPreview } from '@/types/pokemon';
import PokemonType from '@/components/PokemonType';

interface PokemonDetailProps {
  mode: 'detail';
  pokemon: Pokemon;
}

interface PokemonPreviewProps {
  mode: 'preview';
  pokemon: PokemonPreview;
  onSelect: (name: string) => void;
  selected: boolean;
}

type PokemonCardProps = PokemonDetailProps | PokemonPreviewProps;

export default function PokemonCard(props: PokemonCardProps) {
  if (props.mode === 'preview') {
    const id = props.pokemon.url.split('/').filter(Boolean).at(-1);
    return (
      <article className="preview-card">
        <button type="button" className="pokemon-row" aria-pressed={props.selected} onClick={() => props.onSelect(props.pokemon.name)}>
          <span className="catalog-number">{id ? `#${id.padStart(3, '0')}` : '—'}</span>
          <span className="pokemon-name">{props.pokemon.name}</span>
          <span className="row-arrow" aria-hidden="true">↗</span>
        </button>
      </article>
    );
  }

  const { pokemon } = props;
  const image = pokemon.sprites.front_default;

  return (
    <article className="pokemon-detail">
      <div className="pokemon-title"><div><p className="eyebrow">POKÉMON / N° {String(pokemon.id).padStart(3, '0')}</p><h2>{pokemon.name}</h2></div><span className="detail-mark pokeball" aria-hidden="true" /></div>
      <div className="sprite-stage">
        <span className="stage-label">FICHE POKÉDEX</span>
        <span className="stage-orbit" aria-hidden="true" />
        {image ? <img src={image} alt={pokemon.name} width={192} height={192} /> : <p>Image indisponible.</p>}
        <span className="stage-corner" aria-hidden="true">＋</span>
      </div>
      <div className="type-row"><span className="eyebrow">TYPE</span><PokemonType types={pokemon.types} /></div>
    </article>
  );
}
