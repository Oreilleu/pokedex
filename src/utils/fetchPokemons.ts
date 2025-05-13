import { Pokemon } from "@/types/pokemon";

export const fetchPokemons = async (
  page?: number,
  limit?: number,
  name?: string
): Promise<Array<Pokemon>> => {
  try {
    const pageParam = page ? `page=${page}` : "";
    const limitParam = limit ? `limit=${limit}` : "";
    const nameParam = name ? `name=${name}` : "";
    const response = await fetch(
      `https://nestjs-pokedex-api.vercel.app/pokemons?${pageParam}&${limitParam}&${nameParam}`
    );
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching pokemons:", err);
    return [];
  }
};
