import { useEffect, useState } from "react";
import { getPokemon } from "@/services/pokemon";
import type { Pokemon } from "@/types/pokemon";

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; pokemon: Pokemon }
  | { status: "error"; message: string };

export default function usePokemon() {
  const [request, setRequest] = useState<{ query: string } | null>(null);
  const [state, setState] = useState<SearchState>({ status: "idle" });

  useEffect(() => {
    if (!request) return;

    const controller = new AbortController();
    let obsolete = false;

    async function load(query: string) {
      try {
        const pokemon = await getPokemon(query, controller.signal);
        if (!obsolete) setState({ status: "success", pokemon });
      } catch (error: unknown) {
        if (!obsolete) {
          setState({
            status: "error",
            message: error instanceof Error ? error.message : "Erreur inconnue",
          });
        }
      }
    }

    void load(request.query);

    return () => {
      obsolete = true;
      controller.abort();
    };
  }, [request]);

  function search(query: string) {
    setState({ status: "loading" });
    setRequest({ query });
  }

  return { state, search };
}
