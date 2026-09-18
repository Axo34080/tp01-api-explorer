import type { Pokemon } from "@/types/pokemon";

interface PokemonTypeProps {
  types: Pokemon["types"];
}

export default function PokemonType({ types }: PokemonTypeProps) {
  return (
    <ul className="type-list" aria-label="Types du pokémon">
      {types.map(({ type }) => (
        <li className="type-badge" data-type={type.name} key={type.name}>
          {type.name}
        </li>
      ))}
    </ul>
  );
}
