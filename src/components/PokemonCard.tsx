import Pokemon from "@/types/pokemon";
import React, { Fragment } from "react";

interface CardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<CardProps> = (props): JSX.Element => {
  const { pokemon } = props;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-64">
      <h3 className="text-xl font-bold mb-2">{pokemon.name}</h3>
      <p className="text-sm font-semibold text-gray-600">Type: {pokemon.type}</p>
      <p className="text-sm font-semibold text-gray-600">Level: {pokemon.level}</p>
      <p className="text-sm font-semibold text-gray-600">Exp: {pokemon.exp}</p>
      <div className="mt-2">
        <h4 className="text-lg font-semibold mb-2">Stats:</h4>
        {Object.entries(pokemon.stats).map(([stat, value]) => (
          <div key={stat} className="flex justify-between">
            <span className="capitalize">{stat}:</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <h4 className="text-lg font-semibold mb-2">Moves:</h4>
        {pokemon.moves.map((move) => (
          <div key={move.name} className="flex justify-between">
            <h5 className="text-lg font-semibold mb-2">{move.name}</h5>
            <span className="capitalize">Power:</span>
            <span>{move.power}</span>
            <span className="capitalize">Type:</span>
            <span>{move.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
