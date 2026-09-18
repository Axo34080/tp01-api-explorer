import { useEffect, useState } from "react";
import { getPokemonPage } from "@/services/pokemon";
import type { PokemonPage } from "@/types/pokemon";
import PokemonCard from "@/components/PokemonCard";

interface PokemonListProps {
  onSelect: (name: string) => void;
  selectedName: string | null;
}

type PageState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: PokemonPage };

export default function PokemonList({
  onSelect,
  selectedName,
}: PokemonListProps) {
  const [page, setPage] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<PageState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    let obsolete = false;

    getPokemonPage(page, controller.signal)
      .then((data) => {
        if (!obsolete) setState({ status: "success", data });
      })
      .catch((error: unknown) => {
        if (!obsolete) {
          setState({
            status: "error",
            message:
              error instanceof Error ? error.message : "Chargement impossible",
          });
        }
      });

    return () => {
      obsolete = true;
      controller.abort();
    };
  }, [page, attempt]);

  return (
    <section aria-label="Liste des Pokémon">
      <h2>Parcourir les pokémons</h2>
      {state.status === "loading" && <p role="status">Chargement...</p>}
      {state.status === "error" && (
        <div>
          <p role="alert">{state.message}</p>
          <button
            type="button"
            onClick={() => {
              setState({ status: "loading" });
              setAttempt((value) => value + 1);
            }}
          >
            Réessayer
          </button>
        </div>
      )}
      {state.status === "success" && (
        <>
          <ul className="pokemon-list">
            {state.data.results.map((pokemon) => (
              <li key={pokemon.url}>
                <PokemonCard
                  mode="preview"
                  pokemon={pokemon}
                  onSelect={onSelect}
                  selected={pokemon.name === selectedName}
                />
              </li>
            ))}
          </ul>
          <nav className="pagination" aria-label="Pagination des Pokémon">
            <button
              type="button"
              disabled={state.data.previous === null}
              onClick={() => {
                setState({ status: "loading" });
                setPage((value) => Math.max(0, value - 1));
              }}
            >
              Précédent
            </button>
            <span>Page {page + 1}</span>
            <button
              type="button"
              disabled={state.data.next === null}
              onClick={() => {
                setState({ status: "loading" });
                setPage((value) => value + 1);
              }}
            >
              Suivant
            </button>
          </nav>
        </>
      )}
    </section>
  );
}
