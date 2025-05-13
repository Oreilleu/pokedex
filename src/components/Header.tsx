import useTypes from "@/hooks/useTypes";
import { SetStateAction } from "react";

type HeaderProps = {
  setSearchTerm: React.Dispatch<SetStateAction<string>>;
};

export default function Header({ setSearchTerm }: HeaderProps) {
  const { types } = useTypes();

  return (
    <header className="bg-white shadow-md rounded-lg p-4 mb-6 sticky top-0 z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-800">Pokédex</h1>
        </div>

        <div className="w-full md:w-96">
          <input
            className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Rechercher un Pokémon..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-full sm:w-48">
            <label
              htmlFor="type-select"
              className="block text-sm text-gray-600 mb-1"
            >
              Type de Pokémon:
            </label>
            <select
              id="type-select"
              className="w-full p-2 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les types</option>
              {types.map((type, index) => (
                <option key={index + type.id} value={type.name}>
                  {/* <Image src={type.image} alt="" width={25} height={25} /> */}
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
