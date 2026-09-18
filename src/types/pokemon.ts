import { z } from 'zod';

export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string | null;
    };
    types: {
        type:{
            name: string;
        };
    }[];
}

export const pokemonSchema = z.object({
    id: z.number().int().positive(),
    name : z.string().min(1),
    sprites: z.object({
        front_default: z.url().nullable(),
    }),
    types: z.array(z.object({
        type: z.object({
            name: z.string().min(1),
        }),
    })),
}) satisfies z.ZodType<Pokemon>;