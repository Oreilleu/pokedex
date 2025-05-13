import { Type } from "@/types/pokemon-type";
import { useEffect, useState } from "react";

export default function useTypes() {
  const [types, setTypes] = useState<Type[]>([]);

  useEffect(() => {
    if (types.length) return;

    const fetchTypes = async () => {
      try {
        const response = await fetch(
          `https://nestjs-pokedex-api.vercel.app/types`
        );
        if (!response.ok) {
          setTypes([]);
        }
        const data = await response.json();
        setTypes(data);
      } catch (err) {
        console.error("Error fetching pokemons:", err);
        setTypes([]);
      }
    };

    fetchTypes();
  }, []);

  return { types };
}
