import EvolutionChain from "../components/EvolutionChain";
import PokemonCard from "../components/PokemonCard";
import PokemonList from "../components/PokemonList";
import PokemonSearch from "../components/PokemonSearch";
import usePokemon from "../hooks/usePokemon";

export default function App() {
  const { state, search } = usePokemon();

  return (
    <main>
      <h1>Guide d’évolution Pokémon</h1>
      <PokemonSearch onSearch={search} isLoading={state.status === "loading"} />
      {state.status === "idle" && <p>Recherche ou sélectionne un Pokémon.</p>}
      {state.status === "loading" && <p role="status">Chargement…</p>}
      {state.status === "error" && <p role="alert">{state.message}</p>}
      {state.status === "success" && (
        <>
          <PokemonCard mode="detail" pokemon={state.pokemon} />
          <EvolutionChain
            key={state.pokemon.id}
            speciesUrl={state.pokemon.species.url}
            onSelect={search}
          />
        </>
      )}
      <PokemonList onSelect={search} />
    </main>
  );
}
