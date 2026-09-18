import PokemonCard from '@/components/PokemonCard';
import PokemonSearch from '@/components/PokemonSearch';
import usePokemon from '@/hooks/usePokemon';

export default function App() {
  const { state, search } = usePokemon();

  return (
    <main>
      <h1>Guide d'évolution Pokémon</h1>
      <PokemonSearch onSearch={search} isLoading={state.status === 'loading'} />
      {state.status === 'idle' && <p>Recherchez un pokémon pour commencer.</p>}
      {state.status === 'loading' && <p>Chargement...</p>}
      {state.status === 'error' && <p role="alert">{state.message}</p>}
      {state.status === 'success' && <PokemonCard pokemon={state.pokemon} />}
    </main>
  );
}


