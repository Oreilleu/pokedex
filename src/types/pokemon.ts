import { Evolution } from "./evolution";
import { Type } from "./pokemon-type";
import { Stats } from "./stats";

export type Pokemon = {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  sprite: string;
  stats: Stats;
  generation: number;
  evolutions: Array<Evolution>;
  types: Array<Type>;
};
