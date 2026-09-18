import { pokemonSchema } from "@/types/pokemon";
import type { Pokemon } from "@/types/pokemon";
import { pokemonPageSchema } from "@/types/pokemon";
import type { PokemonPage } from "@/types/pokemon";

const cache = new Map<string, Pokemon>();

export async function getPokemon(
  query: string,
  signal: AbortSignal,
): Promise<Pokemon> {
  const key = query.trim().toLowerCase();
  if (!key) throw new Error("Saisis un nom ou un numéro de pokémon");

  const cached = cache.get(key);
  if (cached) return cached;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(key)}`,
    { signal },
  );

  if (response.status === 404) throw new Error("Pokémon introuvable");
  if (!response.ok) throw new Error(`Erreur du serveur (${response.status})`);

  const raw: unknown = await response.json();
  const result = pokemonSchema.safeParse(raw);
  if (!result.success) throw new Error("Données du pokémon invalides");

  const pokemon = result.data;
  cache.set(pokemon.name, pokemon);
  cache.set(String(pokemon.id), pokemon);
  cache.set(key, pokemon);
  return pokemon;
}

const pageCache = new Map<number, PokemonPage>();
export const PAGE_SIZE = 20;

export async function getPokemonPage(
  page: number,
  signal: AbortSignal,
): Promise<PokemonPage> {
  const cached = pageCache.get(page);
  if (cached) return cached;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`,
    { signal },
  );
  if (!response.ok) throw new Error(`Erreur de liste (${response.status}).`);

  const raw: unknown = await response.json();
  const result = pokemonPageSchema.safeParse(raw);
  if (!result.success) throw new Error("Données de liste invalides");

  pageCache.set(page, result.data);
  return result.data;
}
