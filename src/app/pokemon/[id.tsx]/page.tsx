"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/types/pokemon";

export default function PokemonDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://nestjs-pokedex-api.vercel.app/pokemons/${id}`
        );

        if (!response.ok) {
          throw new Error("Pokémon non trouvé");
        }

        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        console.error("Error fetching pokemon details:", err);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemon) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Pokémon non trouvé
          </h1>
          <p className="text-gray-600 mb-4">
            Ce Pokémon n&apos;existe pas dans notre Pokédex.
          </p>
          <Link
            href="/pokemon"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Retour au Pokédex
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link
          href="/pokemon"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Retour au Pokédex
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{pokemon.name}</h1>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
