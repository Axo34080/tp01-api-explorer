import { z } from "zod";

export interface Pokemon {
  id: number;
  name: string;
  species: { url: string };
  sprites: {
    front_default: string | null;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

export const pokemonSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  species: z.object({ url: z.url() }),
  sprites: z.object({
    front_default: z.url().nullable(),
  }),
  types: z.array(
    z.object({
      type: z.object({
        name: z.string().min(1),
      }),
    }),
  ),
}) satisfies z.ZodType<Pokemon>;

export type PokemonPreview = Pick<Pokemon, "name"> & { url: string };

export const pokemonPageSchema = z.object({
  next: z.url().nullable(),
  previous: z.url().nullable(),
  results: z.array(
    z.object({
      name: z.string().min(1),
      url: z.url(),
    }),
  ),
});

export type PokemonPage = z.infer<typeof pokemonPageSchema>;
