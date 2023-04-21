import React, { Fragment } from "react";
import Pokemon from "@/types/pokemon";
import PokemonCard from "./PokemonCard";

interface CardsProps {
    pokemons: Pokemon[];
}

const PokemonCards: React.FC<CardsProps> = (props) => {
    return (
        <Fragment>
        <div className="flex flex-wrap">
                {props.pokemons.map((pokemon) => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
            </div>
        </Fragment>
    );
}

export default PokemonCards;