import EvolutionChain from '@/components/EvolutionChain';
import PokemonCard from '@/components/PokemonCard';
import PokemonList from '@/components/PokemonList';
import PokemonSearch from '@/components/PokemonSearch';
import usePokemon from '@/hooks/usePokemon';

export default function App() {
  const { state, search } = usePokemon();

  return (
    <div className="pokedex">
      <header className="masthead">
        <a className="brand" href="#main"><span className="pokeball" aria-hidden="true" /> HOENN<span className="brand-light">DEX</span></a>
        <span className="edition"><span aria-hidden="true" /> CARNET D’EXPLORATION</span>
      </header>
      <main id="main">
        <section className="intro" aria-labelledby="page-title">
          <div>
            <p className="eyebrow">LE GOÛT DE L’AVENTURE, DE GÉNÉRATION EN GÉNÉRATION</p>
            <h1 id="page-title">Chaque Pokémon.<br /><span>Une histoire à découvrir.</span></h1>
            <p className="intro-copy">Parcourez le Pokédex et remontez le fil de leurs évolutions.</p>
          </div>
          <div className="intro-stamp" aria-hidden="true"><span className="pokeball" /><span>EXPLORE<br />DISCOVER<br />EVOLVE</span></div>
        </section>
        <PokemonSearch onSearch={search} isLoading={state.status === 'loading'} />
        <div className="workspace">
          <div className="detail-panel" aria-label="Pokémon sélectionné" aria-busy={state.status === 'loading'}>
            <div className="panel-heading"><span className="eyebrow">01 / FICHE D’OBSERVATION</span><span className="panel-lights" aria-hidden="true">● ● ●</span></div>
            {state.status === 'idle' && (
              <div className="empty-state">
                <div className="radar" aria-hidden="true"><span className="pokeball" /></div>
                <p className="eyebrow">VOTRE PROCHAINE RENCONTRE</p>
                <h2>L’aventure commence ici.</h2>
                <p>Un nom, un numéro ou un clic dans le catalogue.<br />À vous de choisir votre premier Pokémon.</p>
                <button className="starter-button" type="button" onClick={() => search('treecko')}>Rencontrer Treecko <span aria-hidden="true">↗</span></button>
              </div>
            )}
            {state.status === 'loading' && <div className="state-message" role="status"><span className="loading-dot" />Recherche du Pokémon…</div>}
            {state.status === 'error' && <div className="state-message error-message" role="alert"><span aria-hidden="true">!</span><div><h2>Rencontre manquée</h2><p>{state.message}</p><p>Essayez un autre nom anglais ou un numéro.</p></div></div>}
            {state.status === 'success' && (
              <>
                <PokemonCard mode="detail" pokemon={state.pokemon} />
                <EvolutionChain key={state.pokemon.id} speciesUrl={state.pokemon.species.url} onSelect={search} />
              </>
            )}
          </div>
          <PokemonList onSelect={search} selectedName={state.status === 'success' ? state.pokemon.name : null} />
        </div>
      </main>
      <footer className="site-footer"><span>HOENN DEX <span aria-hidden="true">/</span> UN PETIT AIR D’AVENTURE.</span><span>Projet de fan · Données <a href="https://pokeapi.co/">PokéAPI</a></span></footer>
    </div>
  );
}
