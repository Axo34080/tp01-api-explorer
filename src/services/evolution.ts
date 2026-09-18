import { evolutionChainSchema, speciesSchema } from "@/types/evolution";
import type { Evolution, PokemonSpecies } from "@/types/evolution";

const speciesCache = new Map<string, PokemonSpecies>();
const chainCache = new Map<string, Evolution>();

export async function getSpecies(
  url: string,
  signal: AbortSignal,
): Promise<PokemonSpecies> {
  const cached = speciesCache.get(url);
  if (cached) return cached;

  const response = await fetch(url, { signal });
  if (!response.ok)
    throw new Error(
      `Erreur lors de la récupération des données de la ligne évolutive du Pokémon (${response.status}).`,
    );
  const raw: unknown = await response.json();
  const result = speciesSchema.safeParse(raw);
  if (!result.success)
    throw new Error(
      "Erreur lors de la validation des données de la ligne évolutive du Pokémon.",
    );

  speciesCache.set(url, result.data);
  return result.data;
}

export async function getEvolutionChain(
  speciesUrl: string,
  signal: AbortSignal,
): Promise<Evolution | null> {
  const species = await getSpecies(speciesUrl, signal);
  if (!species.evolution_chain) return null;

  const url = species.evolution_chain.url;
  const cached = chainCache.get(url);
  if (cached) return cached;

  const response = await fetch(url, { signal });
  if (!response.ok)
    throw new Error(`Evolutions indisponibles (${response.status}).`);
  const raw: unknown = await response.json();
  const result = evolutionChainSchema.safeParse(raw);
  if (!result.success) throw new Error("Ligne évolutive du Pokémon invalide.");

  chainCache.set(url, result.data.chain);
  return result.data.chain;
}
