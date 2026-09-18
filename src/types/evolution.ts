import { z } from "zod";

export const speciesSchema = z.object({
  evolution_chain: z.object({ url: z.url() }).nullable(),
  varieties: z.array(
    z.object({
      is_default: z.boolean(),
      pokemon: z.object({ name: z.string().min(1) }),
    }),
  ),
});

export type PokemonSpecies = z.infer<typeof speciesSchema>;

export interface Evolution {
  species: { name: string; url: string };
  evolves_to: Evolution[];
}

const evolutionSchema: z.ZodType<Evolution> = z.lazy(() =>
  z.object({
    species: z.object({ name: z.string().min(1), url: z.url() }),
    evolves_to: z.array(evolutionSchema),
  }),
);

export const evolutionChainSchema = z.object({
  chain: evolutionSchema,
});
