import { Pokemon } from "@/types/pokemon";
import Image from "next/image";

type Props = {
  pokemon: Pokemon;
};

export default function CardSmall({ pokemon }: Props) {
  return (
    <article className="border border-gray-300 rounded-lg p-4 max-w-xs text-center bg-white shadow-md w-36 h-80">
      <h2 className="text-lg font-bold text-gray-800 mb-2">{pokemon.name}</h2>
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={100}
        height={100}
        priority
        className="rounded-full mx-auto mb-4"
      />
      <p className="text-sm text-gray-600">
        Pokedex ID: <span className="font-medium">{pokemon.pokedexId}</span>
      </p>
      <p className="text-sm text-gray-600">
        Generation: <span className="font-medium">{pokemon.generation}</span>
      </p>
      <p className="text-sm text-gray-600 mt-4">Types:</p>
      <ul className="flex justify-center gap-2 mt-2">
        {pokemon.types?.map((type, index) => (
          <li
            key={index + type.id + Math.random()}
            className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded"
          >
            {type.name}
          </li>
        ))}
      </ul>
    </article>
  );
}
