import { Pokemon } from "@/types/pokemon";
import { fetchPokemons } from "@/utils/fetchPokemons";
import { useCallback, useEffect, useState } from "react";

export default function usePokemon() {
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const [page, setPage] = useState(1);

  const addFiftyPokemons = useCallback(async () => {
    const LIMIT = 50;

    const newPokemons = await fetchPokemons(page + 1, LIMIT);

    setPage((prev) => prev + 1);
    setPokemons((prev) => [...prev, ...newPokemons]);
  }, [page]);

  const filterPokemonByText = async (text: string) => {
    try {
      const response = await fetch(
        `https://nestjs-pokedex-api.vercel.app/pokemons?name=${text}`
      );

      if (!response.ok) {
        setPokemons([]);
      }
      const data = await response.json();
      setPokemons(data);
    } catch (err) {
      console.error("Error fetching pokemons:", err);
      setPokemons([]);
    }
  };

  useEffect(() => {
    if (pokemons.length) return;

    const getPokemons = async () => {
      const data = await fetchPokemons();
      setPokemons(data);
    };

    getPokemons();
  }, []);

  return { pokemons, addFiftyPokemons, setPage, filterPokemonByText };
}
