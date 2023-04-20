import React, { Fragment, useState } from "react";
import Pokemon from "@/types/pokemon";
import Move from "@/types/move";

interface CreatePokemonFormProps {
    setPokemons: (pokemons: Pokemon[]) => void;
}

const CreatePokemonForm: React.FC = (): JSX.Element => {
  const pokemonOptions: Partial<Pokemon>[] = Pokemon.load_all();
  const moveOptions: Move[] = Move.load_all();
  const [selectedPokemonName, setSelectedPokemonName] = useState<string>("");
  const [level, setLevel] = useState<number>(1);
  const [move, setMove] = useState<Move>(moveOptions[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedPokemon = pokemonOptions.filter((pokemon) => pokemon.name === selectedPokemonName)
    const name = selectedPokemon[0].name;
    const baseStats = selectedPokemon[0].baseStats;
    const type = selectedPokemon[0].type;

    if (name && baseStats && type) {
      const pokemon = new Pokemon(
        name,
        baseStats,
        level,
        type,
        [move]
    )
    }
};

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="pokemon" className="block text-gray-700 text-sm font-bold mb-2">
            Select Pokemon:
          </label>
          <select
            id="pokemon"
            value={selectedPokemonName}
            onChange={(e) => setSelectedPokemonName(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            {pokemonOptions.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="level" className="block text-gray-700 text-sm font-bold mb-2">
            Level:
          </label>
          <input
            type="number"
            id="level"
            value={level}
            min="1"
            max="100"
            onChange={(e) => setLevel(parseInt(e.target.value))}
            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Create Pokemon
        </button>
      </form>
    </Fragment>
  );
};

export default CreatePokemonForm;
