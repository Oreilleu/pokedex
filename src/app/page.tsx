"use client";

import CardSmall from "@/components/CardSmall";
import Header from "@/components/Header";
import usePokemon from "@/hooks/usePokemons";
import { Pokemon } from "@/types/pokemon";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { pokemons, addFiftyPokemons, filterPokemonByText } = usePokemon();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isLoadingLocked = false;

    const handleScroll = async () => {
      const sizeScreen = window.innerHeight;
      const scrollYPosition = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;

      const distanceFromBottom = scrollHeight - scrollYPosition - sizeScreen;
      const thresholdToFetch = 50;
      const thresholdToUnlock = 200;

      if (distanceFromBottom < thresholdToFetch && !isLoadingLocked) {
        isLoadingLocked = true;
        await addFiftyPokemons();
      } else if (distanceFromBottom > thresholdToUnlock && isLoadingLocked) {
        isLoadingLocked = false;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [addFiftyPokemons]);

  useEffect(() => {
    filterPokemonByText(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <Header setSearchTerm={setSearchTerm} />
      <main className="container mx-auto">
        <ul className="flex justify-between items-center gap-4 flex-wrap">
          {pokemons.map((pokemon: Pokemon, index: number) => (
            <li key={index + pokemon.id}>
              <Link href={`/pokemon/${pokemon.id}`}>
                <CardSmall pokemon={pokemon} />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
